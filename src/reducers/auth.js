import {CHANGE_AUTH} from '../actions/types';

export default function (state = false, action) {

  switch (action.type) {
    case CHANGE_AUTH:
      if(typeof(Storage))
      {
        if(action.login)
        {
          if(typeof action.payload.status != "undefined")
          {
            sessionStorage.removeItem("auth");
            return false;
          }
          else
          {
            sessionStorage.setItem("auth",action.payload);
          }
        }
        else
        {
          sessionStorage.removeItem("auth");
          sessionStorage.removeItem("userName");
        }
      }
      return action.payload;
  }
  return state;
};
