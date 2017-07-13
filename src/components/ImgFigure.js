import React, {Component} from 'react';
import PropTypes from 'prop-types'

class ImgFigure extends Component {
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
        let imgFigureClassName = 'img-figure';
        //为翻转的图片添加class
        imgFigureClassName += this.props.isInverse
            ? ' is-inverse'
            : '';
        return (
            <figure
                className={imgFigureClassName}
                style={{
                width: 256,
                left: this.props.pos
                    ? this.props.pos.left
                    : 0,
                top: this.props.pos
                    ? this.props.pos.top
                    : 0,
                transform: this.props.isCenter
                    ? ''
                    : `rotate(${this.props.rotate
                        ? this.props.rotate
                        : 0}deg)`,
                position: 'absolute',
                zIndex: this.props.isCenter
                    ? 11
                    : 0
            }}
                onClick={this.handleClick}>
                <img src={this.props.imgURL} alt={this.props.title}/>
                <figcaption>
                    <h2 className="img-title">{this.props.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>{this.props.desc}</p>
                    </div>
                </figcaption>
            </figure>
        );
    }
}

ImgFigure.propTypes = {
    onCenter: PropTypes.func.isRequired,
    isCenter: PropTypes.bool.isRequired,
    onInverse: PropTypes.func.isRequired,
    isInverse: PropTypes.bool.isRequired,
    onInit: PropTypes.func.isRequired,
    pos: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
    rotate: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imgURL: PropTypes.string.isRequired
}

export default ImgFigure;