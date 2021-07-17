/**
 * Parse property to a valid integer value
 * @param {string} value - Property value to be parsed
 * @param {int} defaultValue - Default value to be returned if value is invalid. 
 *  Will be casted to integer before return.
 * @param {number} min - Min value
 * @param {number} max - Max value
 * @returns {int}
 */
export function parseIntProp(value, defaultValue, min, max) {
  value = parseInt(value);
  if(isNaN(value)) {
    return defaultValue;
  }
  if(!isNaN(min) && value < min) {
    return defaultValue;
  }
  if(!isNaN(max) && value > max) {
    return defaultValue
  }
  return value;
}

/**
 * Parse property to a valid boolean value
 * @param {string} value - Property value to be parsed 
 * @param {boolean} defaultValue - Default value to be returned if value is invalid. 
 *  Will be casted to boolean before return.
 * @returns {boolean}
 */
export function parseBoolProp(value, defaultValue) {
  if(value === 'true' || value === '') {
    return true;
  }
  if(value === 'false') {
    return false;
  }
  return !!defaultValue;
}