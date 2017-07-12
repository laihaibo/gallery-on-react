import React, {Component} from 'react';
import ControllerUnits from './ControllerUnits';
import ImgFigures from './ImgFigures';
import '../static/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ImgFigures />
        <ControllerUnits />
      </div>
    );
  }
}

export default App;
