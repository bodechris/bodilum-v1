import { ConverseCommand } from "@aws-sdk/client-bedrock-runtime";
import { z } from "zod";
import { getBedrockClient } from "@/lib/bedrock";
import { bedrockConfigured, env } from "@/lib/env";
import type { BrandScorecardResult } from "@/types/brand-scorecard";

const AiInsightSchema = z.object({
  executiveSummary: z.string().trim().min(80).max(1800),
  commercialImpact: z.array(z.string().trim().min(20).max(500)).min(3).max(3),
  priorityNarrative: z.array(z.string().trim().min(20).max(500)).min(3).max(4),
  firstMove: z.string().trim().min(20).max(500),
});

function extractJson(raw: string) {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first < 0 || last <= first) throw new Error("Bedrock response did not contain JSON.");
  return JSON.parse(cleaned.slice(first, last + 1)) as unknown;
}

function promptFor(result: BrandScorecardResult) {
  const categorySummary = result.categoryScores
    .map((category) => `- ${category.title}: ${category.score}/100`)
    .join("\n");
  const priorities = result.priorities
    .map((item) => `- ${item.category}: scored ${item.score}/5. Recommended action: ${item.action}`)
    .join("\n");
  const strengths = result.strengths
    .map((item) => `- ${item.category}: scored ${item.score}/5. ${item.title}`)
    .join("\n");

  return `You are a senior brand strategist advising a small or growing business.

Business:
- Name: ${result.profile.businessName}
- Industry: ${result.profile.industry}
- Website: ${result.profile.website || "Not supplied"}
- Overall brand score: ${result.overallScore}/100
- Maturity: ${result.maturity.label}

Category scores:
${categorySummary}

Lowest-scoring priorities:
${priorities}

Strongest signals:
${strengths}

Create a concise, practical diagnosis that is specific to this industry and score. Do not claim you inspected the website or customers. Do not invent facts, revenue, locations, team size or competitors. Focus on commercial consequences such as trust, clarity, conversion, repeat business, referrals, operational consistency and readiness to grow. Use plain English that works for micro and small businesses in emerging and global markets.

Return raw JSON only with exactly this structure:
{
  "executiveSummary": "Two short paragraphs explaining what the score means for this business.",
  "commercialImpact": ["Three specific business implications."],
  "priorityNarrative": ["Three or four practical priority statements tied to the weak areas."],
  "firstMove": "The single best action to take in the next seven days."
}`;
}

export async function enrichBrandScorecard(result: BrandScorecardResult) {
  if (!bedrockConfigured()) return result;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), env.bedrockTimeoutMs);
    const response = await getBedrockClient().send(
      new ConverseCommand({
        modelId: env.bedrockModelId,
        system: [
          {
            text: "Use only the supplied scorecard evidence. Return valid JSON only. Never invent business facts.",
          },
        ],
        messages: [{ role: "user", content: [{ text: promptFor(result) }] }],
        inferenceConfig: { maxTokens: 1800, temperature: 0.25, topP: 0.9 },
      }),
      { abortSignal: controller.signal },
    ).finally(() => clearTimeout(timeout));

    const raw = (response.output?.message?.content ?? [])
      .map((block) => ("text" in block ? block.text ?? "" : ""))
      .join("")
      .trim();
    const parsed = AiInsightSchema.safeParse(extractJson(raw));
    if (!parsed.success) {
      console.warn("Brand scorecard AI response failed validation", {
        issues: parsed.error.issues.slice(0, 8).map((issue) => ({ path: issue.path.join("."), message: issue.message })),
      });
      return result;
    }
    return { ...result, aiInsight: parsed.data, generatedWithAI: true };
  } catch (error) {
    console.error("Brand scorecard AI enrichment failed", {
      name: error instanceof Error ? error.name : "UnknownError",
      message: error instanceof Error ? error.message.slice(0, 500) : "Unknown error",
    });
    return result;
  }
}
