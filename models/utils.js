/**
 * Generates a validation error message for a MongoDB enum field.
 * @param {Object} enumObject - The enum object representing valid enum values.
 * @returns {string} Returns an error message specifying the invalid enum value and the valid enum values.
 */
export function generateEnumValidationMessage(enumObject) {
  const enumName = enumObject.name;
  const validValues = enumObject.values.join(', ');
  return `{VALUE} is not a valid value for ${enumName}. Valid ${enumName} values include: ${validValues}`;
}
