import {getDegRandom, getRangeRandom} from './getRandom';

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
    leftSecX: [-halfImgW,
      halfStageW - halfImgW * 3
    ],
    rightSecX: [
      halfStageW + halfImgW,
      stageW - halfImgW
    ],
    y: [-halfImgH,
      stageH - halfImgH
    ]
  },
  vPosRange: {
    x: [
      halfStageW - imgW,
      halfImgW
    ],
    topY: [-halfImgH,
      halfStageH - halfImgH * 3
    ]
  }
};

function rearrange(arr, centerIndex = 0) {

  let imgsArrangeArr = [...arr],
    // Constant = this.Constant,
    centerPos = Constant.centerPos,
    hPosRange = Constant.hPosRange,
    vPosRange = Constant.vPosRange,
    hPosRangeLeftSecX = hPosRange.leftSecX,
    hPosRangeRightSecX = hPosRange.rightSecX,
    hPosRangeY = hPosRange.y,
    vPosRangeTopY = vPosRange.topY,
    vPosRangeX = vPosRange.x;

  let idAllArr = imgsArrangeArr.map(img => img.id);

  //首先居中centerIndex图片,居中图片不需要旋转
  let imgsArrangeCenterArr = imgsArrangeArr.filter(img => img.id === centerIndex);

  imgsArrangeCenterArr = imgsArrangeCenterArr.map(img => ({
    ...img,
    pos: centerPos,
    rotate: '0',
    isCenter: true,
    isInverse: false
  }));

  // 取出布局上方的图片的状态信息
  let idTopArr = idAllArr.filter(x => x !== centerIndex);
  let topImgNum = Math.round(Math.random() * 2); // 随机生成顶部图片数量
  let topIndexStart = Math.floor(Math.random() * (idTopArr.length - topImgNum));
  let topIndexEnd = topIndexStart + topImgNum;

  let imgsArrangeTopArr = imgsArrangeArr
    .filter(img => img.id !== centerIndex)
    .slice(topIndexStart, topIndexEnd);

  // 布局位于上方的图片
  imgsArrangeTopArr = imgsArrangeTopArr.map(img => ({
    ...img,
    pos: {
      top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
      left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
    },
    rotate: getDegRandom(),
    isCenter: false,
    isInverse: false
  }))

  // 取出布局左右的图片的状态信息
  let idTopUse = [
    ...imgsArrangeTopArr.map(x => x.id),
    centerIndex
  ];
  let imgsArrangeRestArr = imgsArrangeArr.filter(img => idTopUse.indexOf(img.id) === -1);

  // 布局位于左右的图片
  imgsArrangeRestArr = imgsArrangeRestArr.map((img, index) => {
    let len = imgsArrangeRestArr.length / 2;
    let hPosRangeLORX = index < len
      ? hPosRangeLeftSecX
      : hPosRangeRightSecX;
    return {
      ...img,
      pos: {
        top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
        left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
      },
      rotate: getDegRandom(),
      isCenter: false,
      isInverse: false
    }
  });

  return [
    ...imgsArrangeCenterArr,
    ...imgsArrangeTopArr,
    ...imgsArrangeRestArr
  ].sort((a, b) => a.id - b.id);
}

export default rearrange;