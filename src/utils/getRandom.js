//获取一个范围内的随机值，用于处理图片的分布区间
export const getRangeRandom = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
}

//获取0-30的图片旋转角度
export const getDegRandom = () => {
  return ((Math.random() > 0.5
    ? '+'
    : '-') + Math.floor(Math.random() * 30));
}