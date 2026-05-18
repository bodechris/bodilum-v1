type PublicErrorMessageOptions = {
  internalMessage?: string;
  publicMessage: string;
};

type ErrorLogOptions = {
  context: string;
  error?: unknown;
  details?: Record<string, unknown>;
};

export function getPublicErrorMessage({
  internalMessage,
  publicMessage,
}: PublicErrorMessageOptions) {
  if (process.env.NODE_ENV !== "production" && internalMessage) {
    return internalMessage;
  }

  return publicMessage;
}

export function logInternalError({ context, error, details }: ErrorLogOptions) {
  console.error(`[${context}]`, {
    error,
    ...(details ?? {}),
  });
}
