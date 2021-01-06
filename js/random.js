function getRandomData() {
  const ret = [];
  const instanceSize = getRandomInt(100, 1000);
  const featureSize = getRandomInt(8, 12);
  for (let i = 1; i <= instanceSize; i++) {
    const instance = { name: `i-${i}` };
    for (let f = 1; f <= featureSize; f++) {
      const type = Math.random();
      let value = undefined;
      if (type < 0.25) {
        value = getRandomInt(
          getRandomInt(-100, 0),
          getRandomInt(10, 100)
        );
      } else if (type < 0.40) {
        value = getRandomNumber(
          getRandomInt(-100, 0),
          getRandomInt(10, 100)
        );
      } else if (type < 0.50) {
        value = getRandomNumber(0, 1);
      } else if (type < 0.75) {
        value = getRandomValue(['A', 'B', 'C']);
      } else if (type < 0.85) {
        value = getRandomValue(['D', 'E', 'F', 'G', 'H']);
      } else {
        value = getRandomBool(getRandomNumber(0, 1));
      }
      instance[`f-${f}`] = value;
    }
    instance['real'] = getRandomBool(0.5);
    instance['pred'] = getRandomBool(0.9) ? instance['real'] : !instance['real'];
    ret.push(instance);
  }
  return ret;
}

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
 * @param {Array} values 
 */
function getRandomValue(values) {
  const randomindex = getRandomInt(0, values.length)
  return values[randomindex];
}

/**
 * Returns true or false by a given probability
 * @param {number} trueProbability : 0 ~ 1
 */
function getRandomBool(trueProbability) {
  return (trueProbability > Math.random()) ? true : false;
}
