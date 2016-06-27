import { combineReducers } from 'redux';
import Branding from './branding';
import TopMenu from './top-menu';
import LeftMenu from './left-menu';
import ToolTip from './tool-tip';
import CourseCounters from './course-counters';

const rootReducer = combineReducers({
  "branding":Branding,
  "topMenu":TopMenu,
  "leftMenu":LeftMenu,
  "tooltip":ToolTip,
  "courseCounters":CourseCounters
});

export default rootReducer;
