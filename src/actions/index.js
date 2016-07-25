import axios from 'axios';
import {
  FETCH_BRAND,
  TOP_MENU,
  LEFT_MENU,
  TOOL_TIP,
  COURSE_COUNTERS,
  CHANGE_AUTH,
  ISOTOPE
} from './types';

var server = 'http://10.0.215.78:8080'; //QA
//var server = 'http://10.0.100.97:8080'; //DEV Noman

export function authentication(isLogin,userName="",pass=""){

  var token = false;
  if(isLogin)
  {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      },
      params:{
        "userName": userName,
  			"password": pass
      }
    };
    token = axios.get(server+"/LS360Dashboard/token/get",config);
    //token = axios.get("/LS360Dashboard/token/get",config);
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI5VDAyOjE4OjQ0LjIzMiIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.QMxYwULpVR2rAMYjqtR3AvPpg_4LhZdjgp80juFwOAk";
    sessionStorage.setItem("userName",userName);
  }

  return{
    type:CHANGE_AUTH,
    payload:token
  };
}

export function fetchBrand(){

  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': "bearer "+sessionStorage.auth
    },
    params:{
      access_token : sessionStorage.auth
    }
  };

  const request = axios.post(server+"/LS360ApiGateway/services/rest/brand",JSON.stringify({
    "username":sessionStorage.userName
  }),config);

  return{
    type:FETCH_BRAND,
    payload:request
  };
}

export function leftMenuToggle(isOpen,activeAccType="", activeType=""){
  return{
    type:LEFT_MENU,
    payload:{
      "isOpen":isOpen,
      "activeAccType":activeAccType,
      "activeType":activeType
    }
  };
}

export function topMenuToggle(isOpen){
  return{
    type:TOP_MENU,
    payload:{
      "isOpen":isOpen
    }
  }
}

export function tooltip(visible,pos='default',css={},content=''){
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

export function courseCounters(){

  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': "bearer "+sessionStorage.auth
    },
    params: {
      access_token : sessionStorage.auth
    }
  };
  const request = axios.post(server+"/LS360ApiGateway/services/rest/lms/customer/learner/course/count",JSON.stringify({
    "userName": sessionStorage.userName,
    "countType": [
      "all","subscriptions","completed","inProgress","notstarted"
    ]
  }),config);

  const request2 = {
         "all": 5,
         "notstarted": 3,
         "subscriptions": 1585,
         "inProgress": 1,
         "completed": 1
       };

  return{
    type:COURSE_COUNTERS,
    payload:request
  }
}

export function getIsotope(){

  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': "bearer "+sessionStorage.auth
    },
    params:{
      access_token : sessionStorage.auth
    }
  };

  const request = axios.post(server+"/LS360ApiGateway/services/rest/lms/customer/learner/courses",JSON.stringify({
    "userName":sessionStorage.userName
  }),config);

  return{
    type:ISOTOPE,
    payload:request
  };
}

export function clearState(expression){

  switch (expression) {
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
  }
}
