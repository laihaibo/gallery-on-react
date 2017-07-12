export const SET_INVERSE = 'SET_INVERSE';
export const SET_CENTER = 'SET_CENTER';
export const SET_UPDATE = 'SET_UPDATE';

export const inverse = (id) => ({type: SET_INVERSE, id});

export const center = (id) => ({type: SET_CENTER, id});

export const update = (config) => ({type: SET_UPDATE, config});