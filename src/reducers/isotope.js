import {ISOTOPE} from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case ISOTOPE:
      //console.log(action.payload);
      return action.payload;
  }
  return state;
};
