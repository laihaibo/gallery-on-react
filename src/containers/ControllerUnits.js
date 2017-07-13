import React, {Component} from 'react';
import {connect} from 'react-redux';
import ControllerUnit from '../components/ControllerUnit';
import {inverse, center, update} from '../actions';
import {rearrange} from '../utils';
import PropTypes from 'prop-types';

class ControllerUnits extends Component {
  constructor(props) {
    super(props);
    this.init = this
      .init
      .bind(this);
  }
  init(centerIndex) {
    let config = rearrange(this.props.imgs, Math.round(centerIndex));
    this
      .props
      .onUpdate(config);
  }
  render() {
    return (
      <nav className="ControllerUnits">
        {this
          .props
          .imgs
          .map((img, index) => <ControllerUnit
            key={index}
            {...img}
            onInit={this.init}
            onInverse={this.props.onInverse}
            onCenter={this.props.onCenter}/>)}
      </nav>
    );
  }
}

ControllerUnits.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ControllerUnits);