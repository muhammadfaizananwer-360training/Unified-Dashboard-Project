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
    token = axios.get("/LS360Dashboard/token/get",config);
    //token = axios.get("/LS360Dashboard/token/get",config);
    //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIyMDE2LTA2LTI5VDAyOjE4OjQ0LjIzMiIsInVzZXJfbmFtZSI6ImFkbWluIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9MRUFSTkVSIiwiUk9MRV9UUkFJTklOR0FETUlOSVNUUkFUT1IiLCJST0xFX0lOU1RSVUNUT1IiLCJST0xFX1JFR1VMQVRPUllBTkFMWVNUIiwiUk9MRV9MTVNBRE1JTklTVFJBVE9SIl0sImNsaWVudF9pZCI6IlRlc3RDbGllbnQiLCJzY29wZSI6WyJSRUFEIiwiVFJVU1QiLCJXUklURSJdfQ.QMxYwULpVR2rAMYjqtR3AvPpg_4LhZdjgp80juFwOAk";
    sessionStorage.setItem("userName",userName);
  }

  return{
    type:CHANGE_AUTH,
    payload:token,
    login:isLogin
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

  const request2 = {
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

  const request2 = [
        {"courseSubType": "Self Paced Course",
				"startDate": "2016-06-28",
				"viewAssessmentURI": "#",
				"enrollmentId": 123456,
				"expiryDate": "2016-06-28",
				"certificateURI": "#",
				"timeSpent": "1H 24M",
				"courseImage": "",
				"isSubscriptionEnrollment": false,
				"isExpired": false,
				"courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
				"courseProgress": 100,
				"courseStatus": "completed",
				"launchURI": "#",
				"subscriptionTag": "#",
				"courseType": "Online Course",
				"completionDate": "2016-06-28",
				"courseName": "Designing HP SMB Storage Solutions Rev 15.21 - 00729763 Designing HP SMB Storage Solutions Rev 15.21 - 00729763"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "courseProgress 0 First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "courseProgress 0 Webinar First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "Classroom First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "",
				"startDate": "2016-06-30",
				"viewAssessmentURI": "#",
				"enrollmentId": 123457,
				"expiryDate": "2016-06-30",
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
				"completionDate": "2016-06-28",
				"courseName": "First Responder Awareness Level 1 -> ALL"
			  },
                {
				"courseSubType": "Self Paced Course",
				"startDate": "2016-06-28",
				"viewAssessmentURI": "#",
				"enrollmentId": 123456,
				"expiryDate": "2016-06-28",
				"certificateURI": "#",
				"timeSpent": "1H 24M",
				"courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
				"isSubscriptionEnrollment": false,
				"isExpired": false,
				"courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
				"courseProgress": 56,
				"courseStatus": "inprogress",
				"launchURI": "#",
				"subscriptionTag": "#",
				"courseType": "Online Course",
				"completionDate": "2016-06-28",
				"courseName": "Anti-Money Laundering"
			  },
                {
				"courseSubType": "Self Paced Course",
				"startDate": "2016-06-28",
				"viewAssessmentURI": "#",
				"enrollmentId": 123456,
				"expiryDate": "2016-06-28",
				"certificateURI": "#",
				"timeSpent": "1H 24M",
				"courseImage": "http://www.360training.com/wcsstore/Megasite/images/360training/healthcare/avoiding-falls-in-LTC-th.jpg",
				"isSubscriptionEnrollment": false,
				"isExpired": false,
				"courseGUID": "2a8cacb1b6e3455caf8ca9e9d19ce9ee",
				"courseProgress": 100,
				"courseStatus": "completed",
				"launchURI": "#",
				"subscriptionTag": "#",
				"courseType": "Online Course",
				"completionDate": "2016-06-28",
				"courseName": "CourseStatus (completed) Anti-Money Laundering"
			  },
                {
				"courseSubType": "Self Paced Course",
				"startDate": "2016-06-28",
				"viewAssessmentURI": "#",
				"enrollmentId": 123456,
				"expiryDate": "2016-06-28",
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
				"completionDate": "2016-06-28",
				"courseName": "isExpired=false courseStatus(notstarted) Anti-Money Laundering"
			  },
                {
				"courseSubType": "Self Paced Course",
				"startDate": "2016-06-28",
				"viewAssessmentURI": "#",
				"enrollmentId": 123456,
				"expiryDate": "2016-06-28",
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
				"completionDate": "2016-06-28",
				"courseName": "isExpired (true) courseStatus (inprogress) Laundering"
			  }
      ];

  return{
    type:ISOTOPE,
    payload:request
  };
}
