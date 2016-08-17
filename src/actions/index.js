import axios from 'axios';
import {
  FETCH_BRAND,
  TOP_MENU,
  LEFT_MENU,
  TOOL_TIP,
  COURSE_COUNTERS,
  CHANGE_AUTH,
  ISOTOPE,
  MODAL,
  COURSE_DETAIL,
  TOKEN_VERIFICATION
} from './types';

axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
axios.defaults.headers.post['Content-Type'] = 'application/json';

export function authentication(isLogin,userName="",pass="",token=false)
{
  if(isLogin)
  {
    if(process.env.MOCKED_DATA)
    {
      token = axios({url:'/assets/json/token.json'});
    }
    else
    {
      token = axios.get(process.env.APP_SERVER+"/LS360Dashboard/token/get",{
        params:{
          "userName": userName,
          "password": pass
        }
      });
    }
  }
  sessionStorage.setItem("userName",userName);

  return{
    type:CHANGE_AUTH,
    payload:token
  };
}

export function fetchBrand()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/brand.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/brand",JSON.stringify({
      "username":sessionStorage.userName
    }));
  }
  return{
    type:FETCH_BRAND,
    payload:request
  };
}

export function leftMenuToggle(isOpen,activeAccType="", activeType="")
{
  return{
    type:LEFT_MENU,
    payload:{
      "isOpen":isOpen,
      "activeAccType":activeAccType,
      "activeType":activeType
    }
  };
}

export function topMenuToggle(isOpen)
{
  return{
    type:TOP_MENU,
    payload:{
      "isOpen":isOpen
    }
  }
}

export function tooltip(visible,pos='default',css={},content='')
{
  return{
    type:TOOL_TIP,
    payload:{
      "visible":visible,
      "pos":pos,
      "css":css,
      "content":content
    }
  }
}

export function courseCounters()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/count.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/customer/learner/course/count",JSON.stringify({
      "userName": sessionStorage.userName,
      "countType": [
        "all","subscriptions","completed","inProgress","notstarted"
      ]
    }));
  }

  return{
    type:COURSE_COUNTERS,
    payload:request
  }
}

export function getIsotope()
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/courses.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/customer/learner/courses",JSON.stringify({
    "userName":sessionStorage.userName
    }));
  }
  return{
    type:ISOTOPE,
    payload:request
  };
}

export function clearState(expression)
{
  switch (expression)
  {
    case "ISOTOPE":
      return{
        type:ISOTOPE,
        payload:[]
      };
      break;
    case "COURSE_COUNTERS":
      return{
        type:COURSE_COUNTERS,
        payload:{}
      };
      break;
    case "FETCH_BRAND":
      return{
        type:FETCH_BRAND,
        payload:{}
      };
      break;
    case "COURSE_DETAIL":
      return{
        type:COURSE_DETAIL,
        payload:[]
      };
      break;
  }
}

export function getModal(obj={"visible":false})
{
  return{
    type:MODAL,
    payload:obj
  };
}

export function getCourseDetail(eId)
{
  var request;
  if(process.env.MOCKED_DATA)
  {
    request = axios({url:'/assets/json/view-details.json'});
  }
  else
  {
    request = axios.post(process.env.API_SERVER+"/LS360ApiGateway/services/rest/lms/learner/courses/statistics/byEnrollmentId",JSON.stringify({
      "enrollmentId" : [eId]
    }));
  }

  return{
    type:COURSE_DETAIL,
    payload:request
  };
}

export function tokenVerify(token)
{
  axios.defaults.headers.common['Authorization'] = "bearer "+token;
  const request = axios.get(process.env.API_SERVER+"/LS360ApiGateway/services/rest/jwt/validate");
  return{
    type:TOKEN_VERIFICATION,
    payload:request
  };
}
