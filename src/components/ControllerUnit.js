import React, {Component} from 'react';

class ControllerUnit extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this
            .handleClick
            .bind(this);
    }

    handleClick(e) {
        //翻转和居中图片
        if (this.props.isCenter) {
            this
                .props
                .onInverse(this.props.id)
        } else {
            this
                .props
                .onCenter(this.props.id);
                this.props.onInit(this.props.id);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    render() {
        let controllerUnitClassName = 'controller-unit';
        //如果对应的是居中的图片，显示控制按钮的居中态
        if (this.props.isCenter) {
            controllerUnitClassName += ' is-center';
            //如果翻转显示翻转状态
            if (this.props.isInverse) {
                controllerUnitClassName += ' is-inverse'
            }
        }
        return (
            <span className={controllerUnitClassName} onClick={this.handleClick}></span>
        );
    }
}

export default ControllerUnit;