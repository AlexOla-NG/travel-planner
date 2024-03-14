/**
 * Compose a number of styles together easily
 * @param {String} styles Classes/styles to be applied
 * @return {String} Combined classes
 */
export const composeClasses = (...styles) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

/**
 * Checks if an array is empty
 * @param {Array} arr Array to be tested
 * @return {Boolean} Boolean value
 */
export const isNotEmptyArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * Truncate text with ellipses method
 * This is used to cut short the length of a text and attach ellipses to the
 * end of the text to signify that some part of the text is missing.
 * @param {string} text
 * @param {number} limit
 * @return {string} truncated text
 */
export const truncateText = (text, limit = 20) => {
  return text?.length > limit ? `${text?.slice(0, limit)}...` : text;
};

export const NotificationTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARN: "warn",
  UPLOAD: "upload",
};

/**
 * Separate classes with space between
 * This is used to separate a list of classes that are separated by commas to a list
 * classes that are separated by space
 * @param {string[]} classes
 * @return {string} classNames
 */
export const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

export const errorMessages = {
  email: "Email is not valid",
  maxChar: (num) => `This field cannot have more than ${num} characters`,
  minChar: (num) => `This field must be at least ${num} characters`,
  minLowerCase: (num) => `This field must be at least ${num} lower case character`,
  minUpperCase: (num) => `This field must be at least ${num} upper case character`,
  minNumber: (num) => `This field must be at least ${num} number`,
  minSymbol: (num) => `This field must be at least ${num} special character`,
  required: (name) => `${name} is compulsory`,
  passwordMatch: "Passwords dont match",
};

/**
 * https://stackoverflow.com/a/14794066/16753990
 * Checks if a value is an integer.
 * @param {any} value - The value to check.
 * @return {boolean} Returns true if the value is an integer, otherwise false.
 */
export function isInt(value) {
  return !isNaN(value) && (parseInt(Number(value)) == value || parseFloat(Number(value)) == value) && !isNaN(parseInt(value, 10));
}

/**
 * Return a user-friendly format for a number
 * @param {Number} number Passed number
 * @return {String} Formatted number string
 */
export const formatNumber = (number) => {
  return isInt(number) ? number.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "";
};

/**
 * Format a given number to a currency format
 * NOTE: If we ever need to format for different currencies, this is be a good place to do that :)
 * @param {Number} price The given price
 * @return {String} Formatted price
 */
export const formatMoney = (price) => {
  if (!isInt(price)) {
    return "";
  }

  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(price);

  return formattedPrice;
};

/**
 * Format a given string layout to return a layout object with width and height values
 * @param {string} layoutString The given string layout with format - "width x height"
 * @return {{width: number, height: number}} Formatted layout object {width: number, height: number}
 */
export const formatImageLayout = (layoutString) => {
  const defaultReturn = {
    width: 0,
    height: 0,
  };

  if (layoutString && typeof layoutString === "string") {
    const layout = layoutString.split(" x ");

    defaultReturn.width = parseInt(layout[0]) || 0;
    defaultReturn.height = parseInt(layout[1]) || 0;
  }

  return defaultReturn;
};

/**
 * Generates a restricted Image size layout from an existing image aspect ratio, and a new Image width
 * @param {number} oldWidth The image's old Width
 * @param {number} oldHeight The image's old height
 * @param {number} newWidth The image's new width
 * @return {{width: number, height: number}} New image layout object {width: number, height: number}
 */
export const resizeImage = (oldWidth, oldHeight, newWidth = 350) => {
  const defaultReturn = {
    width: 0,
    height: 0,
  };

  if (typeof oldWidth === "number" && typeof oldHeight === "number" && typeof newWidth === "number") {
    defaultReturn.width = newWidth;
    defaultReturn.height = (newWidth * oldHeight) / oldWidth;
  }

  return defaultReturn;
};

/**
 * Helper function to prevent default event handling and call a specified handler
 * @param {A} event The DOM event
 * @param {A} handler The callback to handle the event
 */
export const handleDOMEvent = (event, handler) => {
  event.preventDefault();
  event.stopPropagation();

  if (typeof handler === "function") handler(event);
};

/**
 * Converts a date string to the "yyyy-mm-dd" format.
 *
 * @param {string} dateString - The input date string in the format 'yyyy-mm-dd'.
 * @return {string|null} The formatted date string in the 'yyyy-mm-dd' format, or null if the input is invalid.
 */
export function convertDateStringToYYYYMMDD(dateString) {
  // Check if the input string is empty
  if (!dateString) {
    // console.error('Input date string is empty');
    return null;
  }

  const date = new Date(dateString);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    // console.error('Invalid date input');
    return null;
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/**
 * Filters out items from the given array that are associated with the specified value.
 *
 * @param {string} value - The value to filter out from the array.
 * @param {Array} array - The array to be filtered.
 * @return {Array} - A new array containing items that are not associated with the specified value.
 *
 * @example
 * const valueToFilter = 'active';
 * const originalArray = ["view", "activate", "pause", "stop", "delete"];
 * const resultArray = filterByValue(valueToFilter, originalArray);
 * console.log(resultArray); // Output: ["view", "pause", "stop", "delete"]
 */
export function filterByValue(value, array) {
  const valueMap = {
    // campaignManager
    active: "activate",
    paused: "pause",
    disabled: "disable",

    // affiliateManager
    approved: "approve",
    pending: "pending",
    // Add more mappings as needed
  };

  const filteredArray = array?.filter((item) => item.toLowerCase() !== valueMap[value?.toLowerCase()]);
  return filteredArray;
}

/**
 * Checks if an object has no set properties
 * @param {*} obj The object to test
 * @return {*} boolean
 */
export const isObjectEmpty = (obj = {}) => !obj || Object.keys(obj).length === 0;
