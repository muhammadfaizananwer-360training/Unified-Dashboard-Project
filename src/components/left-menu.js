import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class LeftMenu extends Component {

  subMenu(data,j) {
      return (
        <div key={j}><Link to={"/"+data.type} className={data.type+"-icon "} activeClassName="active">{data.label}</Link></div>
      );
  }

  menu(data,i) {
      var accType;
      var collapseIn;
      if(this.props.config.activeAccType == data.type)
      {
        accType = "";
        collapseIn = " in";
      }
      else
      {
        accType = data.type;
        collapseIn = "";
      }

      return (
              <div key={i} className="panel">
                    <button
                      onClick={() => this.props.leftMenuToggle(true,accType)}
                      data-toggle="collapse"
                      className={(this.props.config.activeAccType != data.type?"collapsed ":"") + data.type}
                    >
                      <span>{data.label}</span>
                    </button>
                    <div className={"panel-collapse collapse" + collapseIn}>
                      {data.child.map(function(thisData,j){
                        //onClick={() => this.props.leftMenuToggle(true,data.type,thisData.type)}
                        return (
                          <div key={j}>
                            <Link
                              to={"/"+thisData.type}
                              className={thisData.type+"-icon"+(this.props.config.activeType == thisData.type?" active ":"")}
                              activeClassName="active"
                            >
                              {thisData.label}
                            </Link>
                          </div>
                        );
                      },this)}
                    </div>
                 </div>
            );
  }

  render(state) {
    //console.log("left");
    return (
      <div className="sidebar">
        <h4 className="heading"><span>{this.props.data.label}</span></h4>
        <div className="items">
            {this.props.data.child.map(this.menu,this)}
        </div>
        <button id="left-collapse-btn" onClick={() => this.props.leftMenuToggle(!this.props.config.isOpen,this.props.config.activeAccType)} className="collapse-btn"></button>
      </div>
    );
  }
}

function mapState(state){
  return {};
}

export default connect (mapState,actions)(LeftMenu);
