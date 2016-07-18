import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Logout extends Component {

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentDidMount(){
    this.props.authentication(false);
    this.context.router.push("/LS360Dashboard/login");
  }

  render() {
    return (
      <div></div>
    );
  }
}

function mapState(state) {
  return {};
}

export default connect (mapState,actions)(Logout);
