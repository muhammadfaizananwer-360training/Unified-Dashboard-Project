import React, {Component} from 'react';
import {connect} from 'react-redux';

export default (Composition) => {

  class Auth extends Component {

    static contextTypes = {
      router:React.PropTypes.object
    }

    componentWillMount()
    {
      if(this.props.auth == false || typeof this.props.auth == "undefined")
      {
        this.context.router.push('/LS360Dashboard/login');
      }
    }

    /*componentWillUpdate(nextProps)
    {
      if(!nextProps.auth)
      {
        this.context.router.push('/LS360Dashboard/login');
      }
    }*/

    render()
    {
      return <Composition {...this.props}/>;
    }
  }

  function mapState(state)
  {
    return {auth: sessionStorage.auth}; //state.auth};
  }

  return connect(mapState)(Auth);
}
