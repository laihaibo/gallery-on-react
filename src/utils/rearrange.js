import {getDegRandom,getRangeRandom} from './index';

let stageH = window.innerHeight,
  stageW = window.innerWidth,
  halfStageW = Math.floor(stageW / 2),
  halfStageH = Math.floor(stageH / 2);

let imgW = 256,
  imgH = 410,
  halfImgW = Math.floor(imgW / 2),
  halfImgH = Math.floor(imgH / 2);

const Constant = {
  // 计算中心图片位置
  centerPos: {
    left: halfStageW - halfImgW,
    top: halfStageH - halfImgH
  },
  //计算左右排布图片取值范围
  hPosRange: {
    leftSecX: [
      -halfImgW, halfStageW - halfImgW * 3
    ],
    rightSecX: [
      halfStageW + halfImgW, stageW - halfImgW
    ],
    y: [-halfImgH, stageH - halfImgH]
  },
  vPosRange: {
    x: [
      halfStageW - imgW, halfImgW
    ],
    topY: [-halfImgH, halfStageH - halfImgH * 3]
  }
};

function rearrange(arr,centerIndex=0) {

  let imgsArrangeArr = [...arr],
    // Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x,

    imgsArrangeTopArr = [],
    topImgNum = Math.floor(Math.random() * 2),
    topImgSpliceIndex = 0;

    let CenterOne = imgsArrangeArr.map((img,index) => ({...img,index})).filter(img => img.id === centerIndex);

    let imgsArrangeCenterArr = imgsArrangeArr.splice(CenterOne.index, 1);

  //首先居中centerIndex图片,居中图片不需要旋转
  imgsArrangeCenterArr[0] = {
    ...imgsArrangeArr[0],
    pos: centerPos,
    rotate: 0,
    isCenter: centerIndex ? true: false,
    isInverse: false
  };

  // 取出布局上方的图片的状态信息
  topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
  imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

  // 布局位于上方的图片
  imgsArrangeTopArr.forEach((value, index) => {
    imgsArrangeTopArr[index] = {
      ...imgsArrangeTopArr[index],
      pos: {
        top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
        left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
      },
      rotate: getDegRandom(),
      isCenter: false,
  isInverse: false
    }
  });

  // 布局位于左右的图片
  for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
    let hPosRangeLORX = null;
    if (i < k) {
      hPosRangeLORX = hPosRangeLeftSecX;
    } else {
      hPosRangeLORX = hPosRangeRightSecX;
    }
    let temp  = {...imgsArrangeArr[i]};

    imgsArrangeArr[i] = {
      ...temp,
      pos: {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: getDegRandom(),
      isCenter: false,
  isInverse: false
    }
  }
  if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
    imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
  }
  imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

  return imgsArrangeArr;
}

export default rearrange;