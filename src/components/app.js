import React, { Component } from 'react';
import Header from './header';
import LeftMenu from './left-menu';
import Tooltip from './tool-tip';
import {connect} from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
    if(typeof this.props.auth != "undefined"){
      this.props.fetchBrand();
      this.props.topMenuToggle(false);
      if(typeof(Storage) && typeof localStorage.leftMenu != "undefined")
      {
        var obj = JSON.parse(localStorage.leftMenu);
        this.props.leftMenuToggle(obj.isOpen,obj.activeAccType,obj.activeType);
      }
      else
      {
        this.props.leftMenuToggle(true);
      }
    }
  }

  render() {

    if(typeof this.props.branding.logo != 'undefined')
    {
      return (
        <div>
          <Tooltip />
          <div id="wrapper" className={(!this.props.leftMenu.isOpen)?"left-toggle":""}>
            <Header
              data={{
                logo:this.props.branding.logo,
                menu:this.props.branding.topMenu.child,
                user:this.props.branding.userData
              }}
              config={this.props.topMenu}
            />
            <LeftMenu
              data={this.props.branding.leftMenu}
              config={this.props.leftMenu}
            />
            <div className="main">
              {this.props.children}
            </div>
            <div id="content-overlay"></div>
          </div>
        </div>
      );
    }
    else
    {
      return (<div className="full pre-loader"></div>);
    }
  }
}

function mapState(state) {
  return {
          "branding":state.branding,
          "topMenu":state.topMenu,
          "leftMenu":state.leftMenu
         };
}

export default connect(mapState,actions)(App);
