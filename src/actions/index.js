import axios from 'axios';
import {
  FETCH_BRAND,
  TOP_MENU,
  LEFT_MENU,
  TOOL_TIP,
  COURSE_COUNTERS,
} from './types';

export function fetchBrand(){

  //const request = axios.get("https://10.0.100.86:8243/UDBbrand/1.0.0/brandJSON");
  /*var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      "Content-Type": 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI4VDAwOjI5OjA4LjQ4OCIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.3VqV4whOdP9Q_SxapA72Dc2OX3y_1yvuzXFy6Oi5PBQ"
    }
  };

  const request = axios.post("http://10.0.100.94:8080/LS360ApiGateway/services/rest/10octcustomer21111%40lms.com/brand",config);
  */

  const request = {
      logo:{
        label:"360training",
        source:"../assets/img/logo.svg",
        url:"/LS360Dashboard"
      },
      userData:{
        name:"Username",
        email:"username@email.com"
      },
      topMenu:{
        child:[
          {label:"Account Information",type:"account-info",url:"#"},
          {label:"Address Book",type:"address-book",url:"#"},
          {label:"My Orders",type:"orders",url:"#"},
          {label:"Billing & Subscription",type:"billing",url:"#"},
          {label:"Support",type:"support",url:"#"},
          {label:"MENU_DIVIDER",type:"menu_divider",url:"#"},
          {label:"Terms Of Use",type:"terms",url:"#"},
          {label:"Privacy Policy",type:"privacy-policy",url:"#"},
          {label:"MENU_DIVIDER",type:"menu_divider",url:"#"},
          {label:"Sign Out",type:"sign-out",url:"#"}
        ]
      },
      leftMenu:{
          label:"Dashboard",
          child:[
            {
              label:"Learner",
              type:"learn",
              url:"#",
              child:[
                    {label:"My Courses",type:"courses",url:"#"},
                    {label:"My Subscriptions",type:"subscriptions",url:"#"}
              ]
            },
            {
              label:"Author",
              type:"author",
              url:"#",
              child:[
                    {label:"Create & Manage Courses",type:"create-course",url:"#"},
                    {label:"Course Reports",type:"course-report",url:"#"}
              ]
            },
            {
              label:"Manage",
              type:"manage",
              url:"#",
              child:[
                    {label:"Manage Users",type:"manage-users",url:"#"},
                    {label:"Enroll Users",type:"enroll-users",url:"#"},
                    {label:"Run Reports",type:"run-report",url:"#"}
              ]
            },
            {
              label:"Resources",
              type:"resources",
              url:"#",
              child:[
                    {label:"Shop Courses",type:"shop",url:"#"},
                    {label:"Browse Free Courses",type:"browse-free-courses",url:"#"},
                    {label:"Support Forum",type:"support",url:"#"}
              ]
            }
        ]
      }
    };

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

export function tooltip(visible,pos='default',css={},content=""){
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
  /*const request = axios.post("https://10.0.100.86:8243/UDBbrand/1.0.0/brandJSON",{headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI4VDAwOjI5OjA4LjQ4OCIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.3VqV4whOdP9Q_SxapA72Dc2OX3y_1yvuzXFy6Oi5PBQ"
      }});*/
  const request = {
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
