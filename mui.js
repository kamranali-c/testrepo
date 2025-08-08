function groupRowsIntoRanges(rows) {
  const sorted = [...new Set(rows.map(Number))].sort((a, b) => a - b);
  const ranges = [];
  let start = sorted[0];
  let end = sorted[0];

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === end + 1) {
      end = sorted[i];
    } else {
      ranges.push(start === end ? `${start}` : `${start}–${end}`);
      start = sorted[i];
      end = sorted[i];
    }
  }
  ranges.push(start === end ? `${start}` : `${start}–${end}`);
  return ranges.join(", ");
}

export const validateMandatoryColumns = (jsonData) => {
  const errors = [];

  jsonData?.forEach((row, rowIndex) => {
    Object.entries(REQUIRED_FIELDS).forEach(([field, rule]) => {
      const value = row[field];

      if (rule === "notBlank" && (!value || value.toString().trim() === "")) {
        errors.push({ field, message: `${field} is blank`, row: rowIndex + 1 });
      }

      if (rule === "numeric" && (value === undefined || isNaN(Number(value)))) {
        errors.push({ field, message: `${field} must be numeric`, row: rowIndex + 1 });
      }
    });
  });

  if (errors.length > 0) {
    const grouped = {};

    errors.forEach(({ message, row }) => {
      if (!grouped[message]) {
        grouped[message] = [];
      }
      grouped[message].push(row);
    });

    const summary = Object.entries(grouped).map(
      ([message, rows]) => `- ${message} in rows: ${groupRowsIntoRanges(rows)}`
    );

    throw new Error(`Validation failed:\n${summary.join("\n")}`);
  }

  return true;
};
