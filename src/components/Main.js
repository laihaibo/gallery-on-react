require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

//获取图片相关数据，新版json-loader写法，正式发布后可加载网络图片地址
let imageDatas = require('json!../data/imageDatas.json');

// 利用自执行函数，将图片名信息转换成图片url路径信息
imageDatas = ((imageDatasArr)=>{
    for (let i = 0, j = imageDatasArr.length; i < j; i++) {
        let singleImageData = imageDatasArr[i];
        singleImageData.imageURL = require('../images/' + singleImageData.fileName);
        imageDatasArr[i] = singleImageData;
    }
    return imageDatasArr;
})(imageDatas);

//获取一个范围内的随机值，用于处理图片的分布区间
function getRangeRandom(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

//获取0-30的图片旋转角度
function getDegRandom() {
    return ((Math.random() > 0.5 ? '+' : '-') + Math.floor(Math.random() * 30));
}

// 定义一个图片组件
class ImgFigure extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    // 点击处理函数
    handleClick(e) {
        if (this.props.arrange.isCenter) {
            this.props.inverse();
        } else {
            this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let styleObj = {};
        if (this.props.arrange.pos) {
            styleObj = this.props.arrange.pos;
        }

        // 如果图片有旋转角度，添加
        if (this.props.arrange.rotate) {
            // 为style添加前缀，兼容ff15
            (['Moz', 'Ms', 'Webkit', '']).forEach((value) => {
                styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
            });
        }

        //使中心图片不会被遮挡
        if (this.props.arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        let imgFigureClassName = 'img-figure';
        //为翻转的图片添加class
        imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
        return (
            <figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL} alt={this.props.data.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{this.props.data.desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

//定义控制组件
class ControllerUnit extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }

    /*
       *imgsFigue的点击处理函数
       */
      handleClick(e) {
        //翻转和居中图片
        if (this.props.arrange.isCenter) {
          this.props.inverse()
        } else {
          this.props.center();
        }
        e.stopPropagation();
        e.preventDefault();
      }
render() {
    let controllerUnitClassName = 'controller-unit';
    //如果对应的是居中的图片，显示控制按钮的居中态
    if (this.props.arrange.isCenter) {
      controllerUnitClassName += ' is-center ';
      //如果翻转显示翻转状态
      if (this.props.arrange.isInverse) {
        controllerUnitClassName += 'is-inverse'
      }
    }
    return (<span className={ controllerUnitClassName } onClick={this.handleClick}></span>
    );
  }
}

class AppComponent extends React.Component {
    constructor(props) {
        super(props);
        this.Constant = {
            centerPos: {
                left: 0,
                right: 0
            },
            hPosRange: {
                leftSecX: [0, 0],
                rightSecX: [0, 0],
                y: [0, 0]
            },
            vPosRange: {
                x: [0, 0],
                topY: [0, 0]
            }
        };
        this.state = {
            imgsArrangeArr: [
                // {
                //     pos: {
                //         left: '0',
                //         right: '0'
                //     },
                //     rotate: 0,
                // isInverse:false,  图片正反面
                // isCenter:false,
                // }
            ]
        };
    }

    // 反转图片，index输入当前制定剧中被执行inverse操作的图片对应的图片信息数组
    // 这是一个闭包，返回一个真正待被执行的函数
    inverse(index) {
        return () => {
            let imgsArrangeArr = this.state.imgsArrangeArr;
            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
            this.setState({
                imgsArrangeArr: imgsArrangeArr
            })
        }
    }

    // 利用必报函数居中index对应的图片
    center(index) {
        return () => {
            this.rearrange(index);
        }
    }

    //更新排布所有图片
    rearrange(centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
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
            topImgSpliceIndex = 0,
            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        //首先居中centerIndex图片,居中图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        // 取出布局上方的图片的状态信息
        topImgSpliceIndex = Math.floor(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上方的图片
        imgsArrangeTopArr.forEach((value, index) => {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: getDegRandom(),
                isCenter: false
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
            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: getDegRandom(),
                isCenter: false
            }
        }
        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }
        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        })
    }

    // getInitialState(){
    //   return{
    //     imgsArrangeArr:[
    //     //   {
    //     //   pos:{
    //     //     left:'0',
    //     //     top:'0'
    //     //   }
    //     // }
    //     ]
    //   }
    // }

    //组件加载之后，为每张图片计算其位置的范围，（不考虑覆盖）每张图片至少在页面中出现1/4
    componentDidMount() {
        let stageDOM = ReactDOM.findDOMNode(this.refs.stage),
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.floor(stageW / 2),
            halfStageH = Math.floor(stageH / 2);

        // 拿到一个imageFigure的大小
        let imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.floor(imgW / 2),
            halfImgH = Math.floor(imgH / 2);

        //计算中心图片位置
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        }

        //计算左右排布图片取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;

        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;

        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        //计算左右排布图片取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfImgW;

        // 初始化布局函数
        let num = Math.floor(Math.random() * 11);
        this.rearrange(num);
    }
    render() {
        let controllerUnits = [],
            imgFigures = [];
        imageDatas.forEach((value, index) => {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                }
            }
            //增加key值为了提高虚拟dom的性能
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
           controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index)} center={this.center(index)}/>);
                });
            return (<section className="stage" ref="stage">
                <section className="img-sec">{imgFigures}</section><nav className="controller-nav">{controllerUnits}</nav></section>
            );
        }
    }

    AppComponent.defaultProps = {};

    export default AppComponent;
