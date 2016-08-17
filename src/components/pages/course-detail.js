import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class CourseDetail extends Component {

    componentWillMount()
    {
      this.props.getCourseDetail(this.props.eId);
    }

    componentWillUnmount()
    {
      this.props.clearState("COURSE_DETAIL");
    }

    dateConverion(stamp,withTime)
    {
        if(stamp != null)
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
        return "-";
    }

    txtConverion(val,cond,ret)
    {
        if(val != cond)
        {
          return val;
        }
        return ret;
    }

    dateInSecintoHrMin(sec)
    {
        //var totalSec = new Date().getTime() / 1000;
        var totalSec = parseInt(sec);
        var hours = parseInt( totalSec / 3600 );
        var minutes = parseInt( totalSec / 60 ) % 60;
        var seconds = totalSec  % 60;
        var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes);

        return result;
    }

    render()
    {
      if(typeof this.props.courseDetail[0] != "undefined")
      {
          return (
            <div>
               <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Statistics</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Status</td>
                      <td>{this.txtConverion(this.props.courseDetail[0].status,null,"-")}</td>
                    </tr>
                    <tr>
                        <td>Course Progress</td>
                        <td>{this.props.courseDetail[0].percentComplete+"%"}</td>
                    </tr>
                    <tr>
                        <td>First Access Date</td>
                        <td>{this.dateConverion(this.props.courseDetail[0].firstAccessDate,true)}</td>
                    </tr>
                    <tr>
                        <td>Last Access Date</td>
                        <td>{this.dateConverion(this.props.courseDetail[0].lastAccessDate,true)}</td>
                    </tr>
                    <tr>
                        <td>Total Number of Accesses</td>
                        <td>{this.props.courseDetail[0].launchesOccrued}</td>
                    </tr>
                    <tr>
                        <td>Pre Assessment Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].pretestScore+"%","-1%","-")}</td>
                    </tr>
                    <tr>
                      <td>Average Quiz Score</td>
                      <td>{this.txtConverion(this.props.courseDetail[0].averageQuizScore,0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Lowest Quiz Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].lowestQuizScore+"%","-1%","-")}</td>
                    </tr>
                    <tr>
                        <td>Highest Quiz Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].highestQuizScore+"%",0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Total Number of Quizes Attempted</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].numberQuizesTaken,0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Average Post Test Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].averagePostTestScore+"%",0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Lowest Post Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].lowestPostTestScore+"%","-1%","-")}</td>
                    </tr>
                    <tr>
                        <td>Highest Post Test Score</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].highestPostTestScore+"%",0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Total Number of Post Test Attempted</td>
                        <td>{this.txtConverion(this.props.courseDetail[0].numberPostTestsTaken,0,"-")}</td>
                    </tr>
                    <tr>
                        <td>Completion Date</td>
                        <td>{this.dateConverion(this.props.courseDetail[0].completionDate,true)}</td>
                    </tr>
                    <tr>
                        <td>Total Time Spent in Course (hours:minutes)</td>
                        <td>{this.dateInSecintoHrMin(this.props.courseDetail[0].totalTimeInSeconds)}</td>
                    </tr>
                  </tbody>
              </table>
            </div>
          );
      }
      else
      {
          return <div className="pre-loader"></div>;
      }
    }
}

function mapStatToProps(state)
{
    return {"courseDetail":state.courseDetail};
}

export default connect(mapStatToProps,actions)(CourseDetail);
