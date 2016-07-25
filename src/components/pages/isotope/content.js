import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

class Content extends Component {

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

    translateStatus()
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

    startDate(data)
    {
        switch(data.courseType)
        {
          case "Online Course":
            return;
          break;
          case "Classroom Course":
            return <div className="iso-date-time">Start Date: {data.startDate}</div>
          break;
          case "Webinar Course":
            return <div className="iso-date-time">Start Date: {data.startDate}</div>
          break;
        }
    }

    progressBar(data)
    {
        switch(data.courseType)
        {
          case "Online Course":
            return <div className="iso-progress-bar"><span style={{width:(data.courseProgress*1.8)}}></span></div>
          break;
          case "Classroom Course":
            return;
          break;
          case "Webinar Course":
            return;
          break;
        }
    }

    timeSpent(data)
    {
        switch(data.courseType)
        {
          case "Online Course":
            if(data.courseStatus != "completed")
            {
              return <div className="iso-time-take">{data.timeSpent}</div>
            }
            return;
          break;
          case "Classroom Course":
            return;
          break;
          case "Webinar Course":
            return;
          break;
        }
    }

    courseStatus(data)
    {
        switch(data.courseType)
        {
          case "Online Course":
            if(data.courseStatus == "completed")
            {
              var sDate = data.completionDate;
              sDate = sDate.split("T");
              sDate = String(sDate[0]).split("-");
              sDate = sDate[1]+"/"+sDate[2]+"/"+sDate[0];
              return <div className="iso-status">{"Completed "+sDate}</div>
            }
            return;
          break;
          case "Classroom Course":
            return;
          break;
          case "Webinar Course":
            return;
          break;
        }
    }

    bottomBtns(data)
    {
      switch(data.courseType)
      {
        case "Online Course":
          return (
            <div className="iso-icons">
              <a className="play-icon" href="javascript:void(0);">play</a>
              <a className="info-icon" href="javascript:void(0);">info</a>
            </div>
          );
        break;
        case "Classroom Course":
          return (
            <div className="iso-icons">
              <a className="play-icon" href="javascript:void(0);">play</a>
              <a className="info-icon" href="javascript:void(0);">info</a>
              <a className="setting-icon pull-right" href="javascript:void(0);">setting</a>
            </div>
          );
        break;
        case "Webinar Course":
          return (
            <div className="iso-icons">
              <a className="play-icon" href="javascript:void(0);">play</a>
              <a className="info-icon" href="javascript:void(0);">info</a>
              <a className="setting-icon pull-right" href="javascript:void(0);">setting</a>
            </div>
          );
        break;
      }
    }

    box(data,i)
    {
        return(
          <div key={i} className={"iso-item single " + data.courseStatus}>
                <div className="front">
                    {this.image(data)}
                    {this.title(data)}
                    {this.startDate(data)}
                    {this.progressBar(data)}
                    {this.timeSpent(data)}
                    {this.courseStatus(data)}
                    <div className="iso-bottom-options">
                        {this.bottomBtns(data)}
                    </div>
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
                {this.translateStatus()}
              </div>
            );
        }
        else
        {
            return (
                <div>{this.translateStatus()}</div>
            );
        }
    }
}

function mapStatToProps(state)
{
    return {"isotope":state.isotope};
}

export default connect(mapStatToProps,actions)(Content);
