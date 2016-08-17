import React, { Component } from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Header extends Component {

  menu(data,i)
  {
    if(data.label == 'MENU_DIVIDER')
    {
      return (
        <li key={i} className="divider"></li>
      );
    }
    else
    {
      return (
        <li key={i}><Link to={"/LS360Dashboard/"+data.type} activeClassName="active">{data.label}</Link></li>
      );
    }
  }

  render()
  {
    var logoUrl = {backgroundImage: 'url("' + this.props.data.logo.source + '")'};
    return (
        <nav className="navbar-fixed-top">
          <a className="brand" href={this.props.data.logo.url} target="_blank" title={this.props.data.logo.label}></a>
          <ul className="menu">
    				<li className="user-detail">
    					<Link to="/LS360Dashboard/profile"><div className="username">{this.props.data.user.firstName}</div>
    					<div>{this.props.data.user.email}</div></Link>
    				</li>
    				<li className={(this.props.config.isOpen?'open':'')}>
              <button className="dropdown-toggle" type="button" onClick={() => this.props.topMenuToggle(!this.props.config.isOpen)}><span className="glyphicon glyphicon-menu-down"></span></button>
    					<ul className="dropdown-menu dropdown-menu-right">
                {this.props.data.menu.map(this.menu, this)}
    					</ul>
    				</li>
          </ul>
        </nav>
    );
  }
}

function mapState(state)
{
  return{};
}

export default connect (mapState,actions)(Header);
