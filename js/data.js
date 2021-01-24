function getMinMaxAll(instances, meta) {
  console.log(instances, meta)
  // 현재는 수치형 데이터만 고려함
  const ret = {};
  meta.features.forEach(feature => {
    ret[feature.name] = getMinMaxNumerical(instances, feature.name);
  });
  ret.diff = getMinMaxDiff(instances, meta);
  return ret;
}

function getMinMaxNumerical(instances, featureName) {
  let min = Infinity;
  let max = -Infinity;
  instances.forEach(instance => {
    min = Math.min(min, instance[featureName]);
    max = Math.max(max, instance[featureName]);
  });
  return { min, max };
}

function getMinMaxDiff(instances, meta) {
  let max = 0;
  instances.forEach(instance => {
    const diff = instance[meta.predict] - instance[meta.target];
    max = Math.max(max, Math.abs(diff));
  });
  return { min: -max, max: max };
}

// colors 
// TODO: 전역 사용 억제
const colormap = d3.interpolateRdYlBu;

/**
 * data: {
 *   instances: [object, ...]
 *   meta: {
 *     features: [{name: string, type: string(number, category, boolean)}, ...]
 *     target: string,
 *     predict: string,
 *     minmax: {feature_name: {min: number, max: number, diff: number}}
 *   }
 * }
 */
