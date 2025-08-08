const REQUIRED_FIELDS = {
  number: "notBlank",
  incidentStartTime: "notBlank",
  priority: "notBlank",
  severity: "numeric",
  assignmentGroup: "notBlank",
  shortDescription: "notBlank",
  description: "notBlank",
  businessImpact: "numeric"
};

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
    throw new Error(`Validation failed:\n${errors.join("\n")}`);
  }

  return true;
};
