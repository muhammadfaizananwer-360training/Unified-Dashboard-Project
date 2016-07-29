import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class IsoContent extends Component {

    componentDidUpdate()
    {
      ui.isoTope.init();
    }

    constructor(props)
    {
      super(props);
      this.props.clearState("ISOTOPE");
      this.props.getIsotope();
      this.state = {
        "api_status":0
      }
    }

    componentWillReceiveProps(nextProps)
    {
      if(nextProps.isotope.length > 0)
      {
        this.setState({"api_status":1});
      }
      else
      {
        this.setState({"api_status":0});
      }
    }

    checkAPIStatus()
    {
      switch (this.state.api_status) {
        case 0:
          //  loading
          return <div className="pre-loader"></div>;
          break;
        case 1:
          //  success
          return "";
          break;
        case 2:
          //  fail
          return <div className="result-fail"></div>;
          break;
      }
    }

    image(data)
    {
      var path = data.courseImage;
      if(path == "" || path == "null" || path == null)
      {
        switch(data.courseType)
        {
          case "Online Course":
            path = "../assets/img/default-online.jpg";
          break;
          case "Classroom Course":
            path = "../assets/img/default-classroom.jpg";
          break;
          case "Webinar Course":
            path = "../assets/img/default-webinar.jpg";
          break;
        }
      }
      return <div className="iso-image" style={{backgroundImage: 'url('+path+')'}}></div>
    }

    dateConverion(stamp,withTime)
    {
      stamp = stamp.split("T");
      var sDate = String(stamp[0]).split("-");
      sDate = sDate[1]+"/"+sDate[2]+"/"+sDate[0];

      if(!withTime)
      {
        return sDate;
      }

      var ext;
      var sTime = String(stamp[1]).split(":");
      if(sTime[0]<12)
      {
        (sTime[0] == 0? sTime[0] = 12:"");
        ext = "AM";
      }
      else
      {
        ext = "PM";
        (sTime[0] >= 13? sTime[0] = sTime[0]-12:"");
      }
      sTime = sTime[0]+":"+sTime[1];
      return sDate + " " + sTime + " " + ext + " CST";
    }

    mainBtn(data)
    {
      switch(data.courseType)
      {
        case "Online Course":
          if(data.isExpired)
          {
            return (
              <a onClick={() => this.props.getModal({
                  "visible":true,
                  "title":"This Course Has Expired",
                  "body":"<div class='left-icon expired'>Please note that this course expired on <span class='text-red'>"+this.dateConverion(data.expiryDate,true)+"</span>. In order to have full access and pass this course, you must finish it before it expires. In order to complete this course, you will have to re-enroll.</div>",
                  "size":"modal-md"
                })}
              href="javascript:;"
              title="This Course Has Expired"
              className="iso-main-btn expired"></a>
            );
          }
        break;
        case "Classroom Course":

        break;
        case "Webinar Course":

        break;
      }
    }

    title(data)
    {
      var str = data.courseName;
      var limit = 62;
      if(str.length > limit)
      {
        str = str.slice(0,limit)+"...";
      }
      return <div title={data.courseName} className="iso-title">{str}</div>
    }

    progressBar(data,isExpireSoon = false)
    {
      if(data.isExpired)
      {
        return <div className="iso-progress-bar"><span style={{width:100*1.8}}></span></div>
      }
      else
      {
        (isExpireSoon?isExpireSoon=" red":isExpireSoon="")
        return <div className={"iso-progress-bar"+isExpireSoon}><span style={{width:(data.courseProgress*1.8)}}></span></div>
      }
    }

    timeSpent(data)
    {
      if(data.courseStatus != "completed" && !data.isExpired)
      {
        return <div className="iso-time-take">{data.timeSpent}</div>
      }
    }

    courseStatus(data,isExpireSoon = false)
    {
      switch(data.courseType)
      {
        case "Online Course":
          if(data.isExpired)
          {
            return <div className="iso-status">{"Expired "+this.dateConverion(data.expiryDate,false)}</div>
          }
          if(data.courseStatus == "completed")
          {
            return <div className="iso-status">{"Completed "+this.dateConverion(data.completionDate,false)}</div>
          }
          if(isExpireSoon)
          {
            return <div className="iso-status text-red">Expires Soon</div>
          }
        break;
        case "Classroom Course":
          if(data.courseStatus == "completed")
          {
            return <div className="iso-date-time">{"Completed: "+this.dateConverion(data.completionDate,true)}</div>
          }
          else
          {
            return <div className="iso-date-time">{"Start Date: "+this.dateConverion(data.startDate,true)}</div>
          }
        break;
        case "Webinar Course":
          if(data.courseStatus == "completed")
          {
            return <div className="iso-date-time">{"Completed: "+this.dateConverion(data.completionDate,true)}</div>
          }
          else
          {
            return <div className="iso-date-time">{"Start Date: "+this.dateConverion(data.startDate,true)}</div>
          }
        break;
      }
    }

    bottomBtns(data)
    {
      switch(data.courseType)
      {
        case "Online Course":
          if(data.isExpired)
          {
            return (
              <div className="iso-bottom-options">
                <div className="iso-icons">
                  <a className="info-icon" href="javascript:void(0);">info</a>
                </div>
              </div>
            );
          }
          else
          {
            return (
              <div className="iso-bottom-options">
                <div className="iso-icons">
                  <a className="play-icon" href="javascript:void(0);">play</a>
                  <a className="info-icon" href="javascript:void(0);">info</a>
                </div>
              </div>
            );
          }
        break;
        case "Classroom Course":
          return (
            <div className="iso-bottom-options">
              <div className="iso-icons">
                <a className="play-icon" href="javascript:void(0);">play</a>
                <a className="info-icon" href="javascript:void(0);">info</a>
                <a className="setting-icon pull-right" href="javascript:void(0);">setting</a>
              </div>
            </div>
          );
        break;
        case "Webinar Course":
          return (
            <div className="iso-bottom-options">
              <div className="iso-icons">
                <a className="play-icon" href="javascript:void(0);">play</a>
                <a className="info-icon" href="javascript:void(0);">info</a>
                <a className="setting-icon pull-right" href="javascript:void(0);">setting</a>
              </div>
            </div>
          );
        break;
      }
    }

    content(data)
    {
      switch(data.courseType)
      {
        case "Online Course":

          var isExpireSoon = false;
          if(!data.isExpired)
          {
            isExpireSoon = this.isExpireSoon(this.props.currentDate,data.expiryDate);
          }
          return (
            <div>
              {this.progressBar(data,isExpireSoon)}
              {this.timeSpent(data)}
              {this.courseStatus(data,isExpireSoon)}
            </div>
          );
        break;
        case "Classroom Course":
          return (
            <div>
              {this.courseStatus(data)}
            </div>
          );
        break;
        case "Webinar Course":
          return (
            <div>
              {this.courseStatus(data)}
            </div>
          );
        break;
      }
    }

    isExpireSoon(currentDate,expDate)
    {
      currentDate = "2016-07-21";
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      currentDate = new Date(currentDate);
      expDate = new Date(expDate);
      var diffDays = Math.round((expDate.getTime() - currentDate.getTime())/oneDay);
      return diffDays <= 10;
    }

    box(data,i)
    {
      return(
        <div key={i} className={"iso-item single " + data.courseStatus}>
            <div className="front">
                {this.image(data)}
                {this.mainBtn(data)}
                {this.title(data)}
                {this.content(data)}
                {this.bottomBtns(data)}
            </div>
          </div>
      );
    }

    render()
    {
        if(typeof this.props.isotope != "undefined")
        {
            return (
              <div>
                <div id="isotope">
                    {this.props.isotope.map(this.box,this)}
                </div>
                {this.checkAPIStatus()}
              </div>
            );
        }
        else
        {
            return (
                <div>{this.checkAPIStatus()}</div>
            );
        }
    }
}

function mapStatToProps(state)
{
    return {"isotope":state.isotope,"currentDate":state.branding.serverCurrentDate};
}

export default connect(mapStatToProps,actions)(IsoContent);
