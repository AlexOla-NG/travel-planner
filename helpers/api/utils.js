/**
 * Validates the presence of specified fields in a request body object.
 * Throws an error if any of the required fields are missing.
 * 
 * @param {string[]} requiredFields - An array of field names that are required.
 * @param {Object} requestBody - The request body object to validate.
 * @throws {Error} Throws an error if any required field is missing in the request body.
 */
export function validateRequiredFields(requiredFields, requestBody) {
  // Input validation
  if (!isNotEmptyArray(requiredFields)) {
    throw new Error('Required fields must be provided as an array and not empty');
  }
  if (typeof requestBody !== 'object' || requestBody === null) {
    throw new Error('Request body must be provided as an object');
  }

  // Set to store keys of the request body object.
  const requestBodyKeys = new Set(Object.keys(requestBody));
  
  // Array to store missing fields in the request body.
  const missingFields = [];

  // Check if each required field is present in the request body
  for (const field of requiredFields) {
    if (!requestBodyKeys.has(field)) {
      missingFields.push(field);
    }
  }

  // Throw an error if any required field is missing
  if (missingFields.length > 0) {
    throw `Required fields missing in request body: ${missingFields.join(', ')}`;
  }
}

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @return {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

// TODO: create function that trims whitespace from req.body