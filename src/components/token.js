import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Token extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentWillMount()
  {
    var parseToken = window.location.search;
    var l = parseToken.length-1;
    this.state = {
      "token":String(parseToken).substr(1,l)
    }
    this.props.tokenVerify(this.state.token);
  }

  componentWillReceiveProps(nextProps)
  {
    if(typeof nextProps.verify.errors != "undefined")
    {
      this.context.router.push('/LS360Dashboard/login');
    }
    else
    {
      this.props.authentication(false,nextProps.verify.userName,"",this.state.token);
      this.context.router.push('/LS360Dashboard/courses');
    }
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
  return {verify: state.tokenVerification};
}

export default connect(mapState,actions)(Token);
