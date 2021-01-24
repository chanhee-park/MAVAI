/**
 * Get random intger between min and max (uniform random)
 *  - Including the minimum value
 *  - Excluding the maximum value
 * @param {number} min 
 * @param {number} max 
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Get random number between min and max (uniform random)
 *  - Including the minimum value
 *  - Excluding the maximum value
 * @param {number} min 
 * @param {number} max 
 */
function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * get random value from an array (unifrom random)
 * @param {Array} items 
 */
function getRandomItem(items) {
  const randomindex = getRandomInt(0, items.length)
  return items[randomindex];
}

/**
 * Returns true or false by a given probability
 * @param {number} trueProbability : 0 ~ 1
 */
function getRandomBool(trueProbability) {
  return (trueProbability > Math.random()) ? true : false;
}
