import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
            this
                .props
                .onInit(this.props.id);
        }
        e.stopPropagation();
        e.preventDefault();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.pos.left !== this.props.left
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

ControllerUnit.propTypes = {
    onCenter: PropTypes.func.isRequired,
    isCenter: PropTypes.bool.isRequired,
    onInverse: PropTypes.func.isRequired,
    isInverse: PropTypes.bool.isRequired,
    onInit: PropTypes.func.isRequired,
    pos: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired
}

export default ControllerUnit;