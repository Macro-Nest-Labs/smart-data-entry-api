/* eslint-disable @typescript-eslint/no-explicit-any */
export function formatDataStoreError(error: any, defaultMessage?: string): string {
  if (!error) {
    return 'Unknown error';
  }

  const code = error.original?.code ?? error?.parent?.code ?? 'ER_UNKNOWN';
  const message = error.errors?.[0]?.message ?? error.message ?? defaultMessage ?? 'Unknown error';
  return `${code} - ${message}`;
}
