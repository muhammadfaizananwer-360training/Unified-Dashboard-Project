import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class LeftMenu extends Component {

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
                      onMouseOver={() => this.props.tooltip(!this.props.config.isOpen,"right",{top:(170+(50*i))+'px',left:(this.props.config.isOpen?'250px':'50px')},data.label)}
                      onMouseOut={() => this.props.tooltip(false)}
                      data-toggle="collapse"
                      className={(this.props.config.activeAccType != data.type?"collapsed ":"") + data.type}
                    >
                      <span>{data.label}</span>
                    </button>
                    <div className={"panel-collapse collapse" + collapseIn}>
                      {data.child.map(function(thisData,j){
                        return (
                          <div key={j}>
                            <Link
                              to={"/LS360Dashboard/"+thisData.type}
                              className={thisData.type+"-icon"+(this.props.config.activeType == thisData.type?" active ":"")}
                              activeClassName="active"
                              onClick={() => this.props.leftMenuToggle(true,data.type,thisData.type)}
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

  render() {

    return (
      <div className="sidebar">
        <h4 className="heading"><span>{this.props.data.label}</span></h4>
        <div className="items">
            {this.props.data.child.map(this.menu,this)}
        </div>
        <button id="left-collapse-btn"
          onClick={() => this.props.leftMenuToggle(!this.props.config.isOpen,this.props.config.activeAccType)}
          onMouseOver={() => this.props.tooltip(true,"right",{bottom:'3px',left:(this.props.config.isOpen?'250px':'50px')},(this.props.config.isOpen?"Collapse":"Expand"))}
          onMouseOut={() => this.props.tooltip(false)}
          className="collapse-btn">
        </button>
      </div>
    );
  }
}

function mapState(state){
  return {};
}

export default connect (mapState,actions)(LeftMenu);
