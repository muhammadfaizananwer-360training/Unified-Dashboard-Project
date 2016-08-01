import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Logout extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentWillMount()
  {
    this.props.authentication(false);
    this.props.clearState("COURSE_COUNTERS");
    this.props.clearState("FETCH_BRAND");
    sessionStorage.removeItem("auth");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("leftMenu");
    this.context.router.push("/LS360Dashboard/login");
  }

  render()
  {
    return (
      <div></div>
    );
  }
}

function mapState(state)
{
  return {};
}

export default connect (mapState,actions)(Logout);
