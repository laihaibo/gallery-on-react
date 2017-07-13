import {SET_INVERSE, SET_CENTER, SET_UPDATE} from '../actions';

import data from '../static/data';
let nData = data.map((img, index) => ({
  ...img,
  imgURL: `http://obzb8xxij.bkt.clouddn.com/${img.fileName}`,
  // imgURL: require(`../static/images/${index}.jpg`),
  id: index,
  isCenter: false,
  isInverse: false,
  pos: {},
  rotate: ''
}))

export default(state = nData, action) => {
  switch (action.type) {
    case SET_CENTER:
      return state.map(img => img.id === action.id
        ? {
          ...img,
          isCenter: true
        }
        : {
          ...img,
          isCenter: false,
          isInverse: false
        });
    case SET_INVERSE:
      return state.map(img => img.id === action.id
        ? {
          ...img,
          isInverse: !img.isInverse
        }
        : img);
    case SET_UPDATE:
      // return state.map(img=>({   ...img,   xixi:123 }));
      return [...action.config];
    default:
      return state;
  }
}