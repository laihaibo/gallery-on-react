import React, {Component} from 'react';
import ImgFigure from '../components/ImgFigure';
import {inverse, center, update} from '../actions';
import {connect} from 'react-redux';
import {rearrange} from '../utils';
import PropTypes from 'prop-types';

class ImgFigures extends Component {
  constructor(props) {
    super(props);
    this.init = this
      .init
      .bind(this);
  }

  componentDidMount() {
    this.init(this.props.imgs.length / 2);
  }

  init(centerIndex) {
    let config = rearrange(this.props.imgs, Math.round(centerIndex));
    this
      .props
      .onUpdate(config);
  }

  render() {
    return (
      <div className="ImgFigures">
        {this
          .props
          .imgs
          .map((img, index) => <ImgFigure
            key={index}
            {...img}
            onInit={this.init}
            onUpdate={this.props.onUpdate}
            onInverse={this.props.onInverse}
            onCenter={this.props.onCenter}/>)}
      </div>
    );
  }
}

ImgFigures.propTypes = {
  onInverse: PropTypes.func.isRequired,
  onCenter: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({imgs: state})

const mapDispatchToProps = {
  onInverse: inverse,
  onCenter: center,
  onUpdate: update
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigures);