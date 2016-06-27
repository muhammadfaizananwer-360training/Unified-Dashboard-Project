import React, { Component } from 'react';
import Header from './header';
import LeftMenu from './left-menu';
import ToolTip from './tool-tip';
import {connect} from 'react-redux';
import * as actions from '../actions';

class App extends Component {

  constructor(props) {
    super(props);
    this.props.fetchBrand();
    this.props.topMenuToggle(false);
    this.props.leftMenuToggle(true);
  }

  render() {
    var toolTipDiv;
    if(this.props.toolTip.visible)
    {
      toolTipDiv = <ToolTip pos={this.props.toolTip.pos} css={this.props.toolTip.css} content={this.props.toolTip.content} />;
    }
    else
    {
      toolTipDiv = <div></div>;
    }

    if(typeof this.props.branding.logo != 'undefined')
    {
      return (
        <div>
          {toolTipDiv}
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
          </div>
          <div id="content-overlay"></div>
        </div>
      );
    }
    else
    {
      return (<div></div>);
    }
  }
}

function mapState(state) {
  return {
          "branding":state.branding,
          "topMenu":state.topMenu,
          "leftMenu":state.leftMenu,
          "toolTip":state.tooltip
         };
}

export default connect(mapState,actions)(App);
