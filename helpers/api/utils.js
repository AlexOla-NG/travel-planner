import { SignJWT, jwtVerify } from "jose";

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
    throw new Error("Required fields must be provided as an array and not empty");
  }
  if (typeof requestBody !== "object" || requestBody === null) {
    throw new Error("Request body must be provided as an object");
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
    throw `Required fields missing in request body: ${missingFields.join(", ")}`;
  }
}

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @return {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * Trims white spaces from the beginning and end of strings in an object or a single string.
 * source 👉🏾 https://github.com/ankitaabad/request_trimmer/tree/master
 * @param {string|object} input - The input string or object to be trimmed.
 * @returns {string|object} - The trimmed string or object.
 */
export const trim_string = (input) => {
  if (typeof input === "string") {
    return input.trim();
  }
  if (input !== null && typeof input === "object") {
    Object.keys(input).forEach((key) => {
      input[key] = trim_string(input[key]);
    });
  }
  return input;
};

/**
 * Generates a token for the given user.
 * @param {User} user - The user for whom the reset token should be generated.
 * @param {string} duration - When should the token expire.
 * @returns {string} The generated reset token.
 */
export const generateToken = async (user, duration = "1d") => {
  const alg = "HS256";

  try {
    const jwt = await new SignJWT({ email: user.email, id: user.id })
      .setProtectedHeader({ alg })
      .setExpirationTime(duration)
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return jwt;
  } catch (err) {
    console.error("Error generating token:", err);
    throw err;
  }
};

/**
 * Verifies the provided reset token.
 * @param {string} Token - The token to be verified.
 * @returns {Promise<boolean>} `true` if the token is valid, `false` otherwise.
 */
export const verifyToken = async (token) => {
  if (!token) {
    return false;
  }
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return payload.email;
  } catch (err) {
    console.error("Error verifying token:", err);
    return false;
  }
};
