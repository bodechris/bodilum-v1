import { env } from "@/lib/env";

type OpenAIResponseContent = {
  type?: string;
  text?: string;
  refusal?: string;
};

type OpenAIResponseItem = {
  type?: string;
  content?: OpenAIResponseContent[];
};

type OpenAIResponsesPayload = {
  id?: string;
  status?: string;
  output?: OpenAIResponseItem[];
  incomplete_details?: { reason?: string } | null;
  usage?: {
    input_tokens?: number;
    output_tokens?: number;
    total_tokens?: number;
  };
  error?: {
    code?: string;
    message?: string;
    type?: string;
  } | null;
};

function responseText(payload: OpenAIResponsesPayload) {
  return (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .filter((content) => content.type === "output_text" || Boolean(content.text))
    .map((content) => content.text ?? "")
    .join("")
    .trim();
}

function responseRefusal(payload: OpenAIResponsesPayload) {
  return (payload.output ?? [])
    .flatMap((item) => item.content ?? [])
    .find((content) => content.type === "refusal" || Boolean(content.refusal))
    ?.refusal;
}

export async function invokeOpenAI(
  systemInstruction: string,
  prompt: string,
  maxOutputTokens = 5200,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), env.openAiTimeoutMs);

  try {
    const response = await fetch(`${env.openAiBaseUrl}/responses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.openAiApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: env.openAiModel,
        instructions: systemInstruction,
        input: prompt,
        max_output_tokens: maxOutputTokens,
        store: false,
        text: { format: { type: "json_object" } },
      }),
      signal: controller.signal,
      cache: "no-store",
    });

    const payload = await response.json().catch(() => ({})) as OpenAIResponsesPayload;

    if (!response.ok) {
      const message = payload.error?.message || `OpenAI returned HTTP ${response.status}`;
      const error = new Error(message);
      error.name = payload.error?.type || payload.error?.code || "OpenAIAPIError";
      throw error;
    }

    const refusal = responseRefusal(payload);
    if (refusal) {
      const error = new Error(`OpenAI refused the prospect analysis request: ${refusal}`);
      error.name = "OpenAIRefusalError";
      throw error;
    }

    if (payload.status === "incomplete") {
      const error = new Error(
        `OpenAI returned an incomplete response${payload.incomplete_details?.reason ? `: ${payload.incomplete_details.reason}` : ""}`,
      );
      error.name = "OpenAIIncompleteResponseError";
      throw error;
    }

    const text = responseText(payload);
    if (!text) {
      const error = new Error("OpenAI returned an empty response");
      error.name = "OpenAIEmptyResponseError";
      throw error;
    }

    console.info("Prospect analysis model invocation completed", {
      provider: "openai",
      modelId: env.openAiModel,
      responseId: payload.id,
      inputTokens: payload.usage?.input_tokens,
      outputTokens: payload.usage?.output_tokens,
      totalTokens: payload.usage?.total_tokens,
    });

    return text;
  } finally {
    clearTimeout(timeout);
  }
}
