import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Token extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentWillMount()
  {
    var token = window.location.search;
    var l = token.length-1;
    token = String(token).substr(1,l);
    this.props.tokenVerify(token);
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
