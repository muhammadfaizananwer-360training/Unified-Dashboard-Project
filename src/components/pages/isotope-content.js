import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class IsoContent extends Component {

    componentDidUpdate()
    {
      ui.isoTope.init();
    }

    componentWillMount()
    {
      this.props.clearState("ISOTOPE");
      this.props.getIsotope();
      this.state = {
        "isLoading":true,
        "isFirstTime":true,
        "list":[]
      }
    }

    componentWillReceiveProps(nextProps)
    {
      this.setState({"list": this.state.list.concat(nextProps.isotope)});

      if(!this.state.isFirstTime)
      {
        this.setState({"isLoading":false});
      }
      this.setState({"isFirstTime":false});
    }

    checkAPIStatus()
    {
      if (!this.state.isLoading)
      {
        //  success
        return "";
      }
      else
      {
        //  loading
        return <div className="pre-loader"></div>;
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
      var limit = 48;
      if(str.length > limit)
      {
        str = str.slice(0,limit)+"...";
      }
      return <div title={data.courseName} className="iso-title">{str}</div>
    }

    progressBar(data)
    {
      if(data.isExpired)
      {
        return <div className="iso-progress-bar"><span style={{width:100*1.8}}></span></div>
      }
      else
      {
        (data.isExpireSoon?data.isExpireSoon=" red":data.isExpireSoon="")
        return <div className={"iso-progress-bar"+data.isExpireSoon}><span style={{width:(data.courseProgress*1.8)}}></span></div>
      }
    }

    timeSpent(data)
    {
      if(data.courseStatus != "completed" && !data.isExpired)
      {
        return <div className="iso-time-take">{data.timeSpent}</div>
      }
    }

    courseStatus(data)
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
          if(data.isExpireSoon)
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
          else if(data.isExpireSoon)
          {
            return (
              <div className="iso-bottom-options">
                <div className="iso-icons">
                  <a className="play-icon" href="javascript:void(0);">play</a>
                  <a className="info-icon" href="javascript:void(0);">info</a>
                  <a className="expire-soon-icon pull-right" href="javascript:void(0);" title="This Course Is Expiring"
                  onClick={() => this.props.getModal({
                      "visible":true,
                      "title":"This Course Is Expiring",
                      "body":"<div class='left-icon expire-soon'>Please note that this course will be expiring on <span class='text-red'>"+this.dateConverion(data.expiryDate,true)+"</span>. In order to have full access and pass this course, you must finish it before it expires. Expired courses prior to completion means you will have to re-enroll.</div>",
                      "size":"modal-md"
                    })}>expire soon</a>
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
          return (
            <div>
              {this.progressBar(data)}
              {this.timeSpent(data)}
              {this.courseStatus(data)}
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

    isExpiredOrSoon(currentDate,expDate)
    {
      //currentDate = "2016-07-11";
      //expDate = "2016-07-22";
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      currentDate = new Date(currentDate);
      expDate = new Date(expDate);
      var diffDays = Math.round((currentDate.getTime() - expDate.getTime())/oneDay);
      //console.log(diffDays, diffDays >= -10, diffDays >= 0);
      return [diffDays >= 0,diffDays >= -10];
    }

    box(data,i)
    {
      var cData = this.isExpiredOrSoon(this.props.currentDate,data.expiryDate);
      data.isExpired = cData[0];
      data.isExpireSoon = cData[1];

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
                  {this.state.list.map(this.box,this)}
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
