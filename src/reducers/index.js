import { combineReducers } from 'redux';
import Branding from './branding';
import TopMenu from './top-menu';
import LeftMenu from './left-menu';
import ToolTip from './tool-tip';
import Auth from './auth';
import CourseCounters from './course-counters';
import Isotope from './isotope';
import Modal from './modal';
import CourseDetail from './course-detail';
import TokenVerification from './token-verification';

const rootReducer = combineReducers({
  "branding":Branding,
  "topMenu":TopMenu,
  "leftMenu":LeftMenu,
  "tooltip":ToolTip,
  "courseCounters":CourseCounters,
  "auth":Auth,
  "isotope":Isotope,
  "modal":Modal,
  "courseDetail":CourseDetail,
  "tokenVerification":TokenVerification
});

export default rootReducer;
