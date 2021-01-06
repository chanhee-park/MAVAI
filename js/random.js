function getRandomData() {
  const instanceSize = getRandomInt(100, 300);
  const featureSize = getRandomInt(8, 16);
  const instances = [];
  const features = [];

  for (let i = 1; i <= instanceSize; i++) {
    const instance = {};
    instance['name'] = `i-${i}`;
    instance['real'] = getRandomInt(0, 100);
    instance['pred'] = instance['real'] * getRandomNumber(0.75, 1.25); 

    // random features
    for (let f = 1; f <= featureSize; f++) {
      const featureName = `f-${f}`;
      let type = Math.random();
      let value = undefined;
      if (type < 10.25) {
        type = 'number'
        value = getRandomInt(getRandomInt(-100, 0), getRandomInt(10, 100));
      } else if (type < 0.40) {
        type = 'number'
        value = getRandomNumber(getRandomInt(-100, 0), getRandomInt(10, 100));
      } else if (type < 0.50) {
        type = 'number'
        value = getRandomNumber(0, 1);
      } else if (type < 0.75) {
        type = 'category'
        value = getRandomValue(['A', 'B', 'C']);
      } else if (type < 0.85) {
        type = 'category'
        value = getRandomValue(['D', 'E', 'F', 'G', 'H']);
      } else {
        type = 'boolean';
        value = getRandomBool(getRandomNumber(0, 1));
      }
      instance[featureName] = value;
      if (i === 1) {
        features.push({ name: featureName, type: type });
      }
    }
    instances.push(instance);
  }
  const meta = {
    features: features,
    target: "real",
    predict: "pred"
  }
  return { instances, meta };
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
