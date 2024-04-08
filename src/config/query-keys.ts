export const docsKeys = {
  all: ["docs"] as const,
  filter: (filters: string) => [...docsKeys.all, { filters }] as const,
};
