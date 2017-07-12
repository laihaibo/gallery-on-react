import React, {Component} from 'react';
import ImgFigure from '../components/ImgFigure';
import {inverse, center, update} from '../actions';
import {connect} from 'react-redux';
import rearrange from '../utils/rearrange';

class ImgFigures extends Component {
  constructor(props) {
    super(props);
    this.init = this.init.bind(this);
  }

  componentDidMount() {
    this.init(this.props.imgs.length/2);
  }
  
  init(centerIndex) {
    let config =  rearrange(this.props.imgs,Math.round(centerIndex));
    console.log(config)
    this.props.onUpdate(config);
  }


  render() {
    return (
      <div className="ImgFigures" ref="stage">
        {this.props.imgs
          .map((img,index) => <ImgFigure
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

const mapStateToProps = (state) => ({imgs: state})

const mapDispatchToProps = {
  onInverse: inverse,
  onCenter: center,
  onUpdate: update
}

export default connect(mapStateToProps, mapDispatchToProps)(ImgFigures);