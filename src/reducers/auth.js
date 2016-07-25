import {CHANGE_AUTH} from '../actions/types';

export default function (state = {}, action) {

  switch (action.type) {
    case CHANGE_AUTH:
      if(typeof(Storage))
      {
        if(typeof action.payload.errors == "undefined")
        {
          //console.log(1);
          sessionStorage.setItem("auth",action.payload);
        }
        else
        {
          //console.log(2);
          sessionStorage.removeItem("auth");
        }
      }
      return action.payload;
  }
  return state;
};
