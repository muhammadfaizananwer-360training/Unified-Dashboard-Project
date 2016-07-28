import {LEFT_MENU} from "../actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LEFT_MENU:
      if(typeof(Storage) && typeof sessionStorage.leftMenu == "undefined")
      {
        sessionStorage.setItem("leftMenu",JSON.stringify(action.payload));
      }
      else
      {
        sessionStorage.leftMenu = JSON.stringify(action.payload);
      }
      return action.payload;
  }
  return state;
};
