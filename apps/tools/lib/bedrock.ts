import {
  BedrockRuntimeClient,
  type BedrockRuntimeClientConfig,
} from "@aws-sdk/client-bedrock-runtime";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import { env } from "@/lib/env";

declare global {
  var __bodilumBedrockClient: BedrockRuntimeClient | undefined;
}

export function getBedrockClient() {
  if (globalThis.__bodilumBedrockClient) return globalThis.__bodilumBedrockClient;
  const config: BedrockRuntimeClientConfig = { region: env.awsRegion, maxAttempts: 2 };
  if (env.awsRoleArn) {
    config.credentials = awsCredentialsProvider({ roleArn: env.awsRoleArn });
  }
  globalThis.__bodilumBedrockClient = new BedrockRuntimeClient(config);
  return globalThis.__bodilumBedrockClient;
}
