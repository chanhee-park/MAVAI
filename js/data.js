const data = getRandomData();

function getMinMaxValue(instances, featureName) {
  let min = Infinity;
  let max = -Infinity;
  instances.map(instance => {
    const value = instance[featureName];
    min = (min < value) ? min : value;
    max = (max > value) ? max : value;
  });
  return { min, max };
}

/**
 * data: {
 *   instances: [object, ...]
 *   meta: {
 *     featurs: [{name: string, type: string(number, category, boolean)}, ...]
 *     target: string,
 *     predict: string
 *   }
 * }
 */
