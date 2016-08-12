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

var apiServer = 'http://10.0.215.78:8080'; //QA
//var apiServer = 'http://10.0.100.97:8080'; //DEV Noman
//var apiServer = 'http://10.0.100.94:8080'; // DEV Irfan
var appServer = apiServer;//'http://localhost:8081';

export function authentication(isLogin,userName="",pass="")
{
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
    token = axios.get(appServer+"/LS360Dashboard/token/get",config);
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI5VDAyOjE4OjQ0LjIzMiIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.QMxYwULpVR2rAMYjqtR3AvPpg_4LhZdjgp80juFwOAk";
    sessionStorage.setItem("userName",userName);
  }

  return{
    type:CHANGE_AUTH,
    payload:token
  };
}

export function fetchBrand()
{
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

  const request = axios.post(apiServer+"/LS360ApiGateway/services/rest/brand",JSON.stringify({
    "username":sessionStorage.userName
  }),config);

  const request2 = {
    logo:{
      label:"360training",
      source:"../assets/img/logo.svg",
      url:"/LS360Dashboard"
    },
    userData:{
      userName:"Username",
      email:"username@email.com",
      firstName:"firstName",
      lastName:"lastName"
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
            label:"Learn",
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
    },
    serverCurrentDate:"2016-07-21"
  };

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
  const request = axios.post(apiServer+"/LS360ApiGateway/services/rest/lms/customer/learner/course/count",JSON.stringify({
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

export function getIsotope()
{
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

  const request = axios.post(apiServer+"/LS360ApiGateway/services/rest/lms/customer/learner/courses",JSON.stringify({
    "userName":sessionStorage.userName
  }),config);

  const request2 = [
        {"courseSubType": "Self Paced Course",
        "startDate": "2016-07-28T23:59:59",
        "viewAssessmentURI": "#",
        "enrollmentId": 5618,
        "expiryDate": "2016-08-10T23:59:59",
        "certificateURI": "#",
        "timeSpent": "1H 24M",
        "courseImage": "",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
        "courseProgress": 10,
        "courseStatus": "completed",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Online Course",
        "completionDate": "2016-06-28T23:59:59",
        "courseName": "Designing HP SMB Storage Solutions Rev 15.21 - 00729763 Designing HP SMB Storage Solutions Rev 15.21 - 00729763"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T23:59:59",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T23:59:59",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T23:59:59",
        "courseName": "courseProgress 0 First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T23:59:59",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T23:59:59",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Webinar Course",
        "completionDate": "2016-06-28T23:59:59",
        "courseName": "courseProgress 0 Webinar First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T23:59:59",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T23:59:59",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T23:59:59",
        "courseName": "Classroom First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "",
        "startDate": "2016-06-30T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 123457,
        "expiryDate": "2016-06-30T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 13M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "5b0a7cfec05b4329b0ed8dd3741dee21",
        "courseProgress": 0,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "First Responder Awareness Level 1 -> ALL"
        },
                {
        "courseSubType": "Self Paced Course",
        "startDate": "2016-06-28T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 5618,
        "expiryDate": "2016-06-28T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 24M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": true,
        "courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
        "courseProgress": 56,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Online Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "Anti-Money Laundering"
        },
                {
        "courseSubType": "Self Paced Course",
        "startDate": "2016-06-28T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 5618,
        "expiryDate": "2016-06-28T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 24M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": true,
        "courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
        "courseProgress": 100,
        "courseStatus": "completed",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Online Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "CourseStatus (completed) Anti-Money Laundering"
        },
                {
        "courseSubType": "Self Paced Course",
        "startDate": "2016-06-28T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 5618,
        "expiryDate": "2016-06-28T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 24M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": false,
        "courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
        "courseProgress": 56,
        "courseStatus": "notstarted",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Classroom Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "isExpired=false courseStatus(notstarted) Anti-Money Laundering"
        },
                {
        "courseSubType": "Self Paced Course",
        "startDate": "2016-06-28T02:49:35.77",
        "viewAssessmentURI": "#",
        "enrollmentId": 5618,
        "expiryDate": "2016-06-28T02:49:35.77",
        "certificateURI": "#",
        "timeSpent": "1H 24M",
        "courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
        "isSubscriptionEnrollment": false,
        "isExpired": true,
        "courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
        "courseProgress": 56,
        "courseStatus": "inprogress",
        "launchURI": "#",
        "subscriptionTag": "#",
        "courseType": "Online Course",
        "completionDate": "2016-06-28T02:49:35.77",
        "courseName": "isExpired (true) courseStatus (inprogress) Laundering"
        }
      ];

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

  const request = axios.post(apiServer+"/LS360ApiGateway/services/rest/lms/learner/courses/statistics/byEnrollmentId",JSON.stringify({
    "enrollmentId" : [eId]
  }),config);

  const request2 = [{
      "firstAccessDate": "2015-02-20T19:08:55.57",
      "lastAccessDate": "2015-02-20T19:25:41.277",
      "launchesOccrued": 5,
      "preTestDate": null,
      "pretestScore": -1,
      "completed": true,
      "status": "Reported",
      "completionDate": "2015-02-20T19:28:08.137",
      "percentComplete": 100,
      "lowestPostTestScore": 75,
      "averagePostTestScore": 75,
      "highestPostTestScore": 75,
      "firstPostTestDate": "2015-02-20T19:22:51.993",
      "lastPostTestDate": "2015-02-20T19:22:51.993",
      "numberPostTestsTaken": 1,
      "lowestQuizScore": -1,
      "averageQuizScore": 0,
      "highestQuizScore": 0,
      "numberQuizesTaken": 0,
      "firstQuizDate": null,
      "lastQuizDate": null,
      "totalTimeInSeconds": 2465,
      "certificateNumber": "OSHA-000632",
      "certificateIssuedDate": "2015-02-20T19:28:08.337",
      "learnerEnrollmentId": 247835
    }];

  return{
    type:COURSE_DETAIL,
    payload:request
  };
}

export function tokenVerify(token)
{
  var config = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+token,
      "Accept":"application/json"
    }
  };

  const request = axios.get(apiServer+"/LS360ApiGateway/services/rest/jwt/validate",config);

  return{
    type:TOKEN_VERIFICATION,
    payload:request
  };
}
