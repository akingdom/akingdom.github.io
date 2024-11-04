// mathUtils.js

/**
 * Generates a random number within the given range.
 * @param {number} range - The upper limit for the random number.
 * @returns {number} - A random number between 0 and range-1.
 */
export function randomRange(range) {
    return Math.floor(Math.random() * range);
}
