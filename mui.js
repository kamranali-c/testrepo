
export const validateMandatoryColumns = (jsonData) => {
  const errors = [];

  jsonData?.forEach((row, rowIndex) => {
    Object.entries(REQUIRED_FIELDS).forEach(([field, rule]) => {
      const value = row[field];

      if (rule === "notBlank" && (!value || value.toString().trim() === "")) {
        errors.push(`Row ${rowIndex + 1}: ${field} is blank`);
      }

      if (rule === "numeric" && (value === undefined || isNaN(Number(value)))) {
        errors.push(`Row ${rowIndex + 1}: ${field} must be numeric`);
      }
    });
  });

  if (errors.length > 0) {
    const grouped = {};

    errors.forEach((error) => {
      const match = error.match(/Row (\d+): (.+)/);
      if (match) {
        const row = match[1];
        const message = match[2];

        if (!grouped[message]) {
          grouped[message] = [];
        }
        grouped[message].push(row);
      }
    });

    const summary = Object.entries(grouped).map(
      ([message, rows]) => `- ${message} in rows: ${rows.join(", ")}`
    );

    throw new Error(`Validation failed:\n${summary.join("\n")}`);
  }

  return true;
};
