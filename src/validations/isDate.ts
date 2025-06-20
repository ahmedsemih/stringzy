export function isDate(input: string): boolean {
  if (typeof input !== "string") return false;

  const formats = [
    {
      // Format: YYYY-MM-DD 
      regex: /^\d{4}-\d{2}-\d{2}$/,
      split: (s: string) => s.split("-").map(Number),
      order: ["Y", "M", "D"],
    },
    {
      // Format: MM-DD-YYYY 
      regex: /^\d{2}-\d{2}-\d{4}$/,
      split: (s: string) => s.split("-").map(Number),
      order: ["M", "D", "Y"],
    },
    {
      // Format: DD-MM-YYYY 
      regex: /^\d{2}-\d{2}-\d{4}$/,
      split: (s: string) => s.split("-").map(Number),
      order: ["D", "M", "Y"],
    },
    {
      // Format: DD/MM/YYYY 
      regex: /^\d{2}\/\d{2}\/\d{4}$/,
      split: (s: string) => s.split("/").map(Number),
      order: ["D", "M", "Y"],
    },
    {
      // Format: YYYY/MM/DD 
      regex: /^\d{4}\/\d{2}\/\d{2}$/,
      split: (s: string) => s.split("/").map(Number),
      order: ["Y", "M", "D"],
    },
  ];

  for (const format of formats) {
    if (format.regex.test(input)) {
      const parts = format.split(input);
      const dateParts: Record<string, number> = {};
      format.order.forEach((key, i) => {
        dateParts[key] = parts[i];
      });

      const { Y, M, D } = dateParts;
      const date = new Date(Y, M - 1, D); // JS months are 0-indexed
      return date.getFullYear() === Y && date.getMonth() === M - 1 && date.getDate() === D;
    }
  }

  return false;
}
