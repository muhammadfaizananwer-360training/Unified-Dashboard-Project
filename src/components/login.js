import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      "userName":"",
      "pass":""
    }
  }

  static contextTypes = {
    router:React.PropTypes.object
  }

  componentDidUpdate() {
    if(this.props.auth != false
      && this.props.auth != "Error: Network Error"
      && this.props.auth != "")
    {
      this.context.router.push("/LS360Dashboard/courses");
    }
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  onSubmit(){
    this.props.authentication(true,this.state.userName,this.state.pass);
  }

  render() {

    return (
      <div className="login-form">
        <div className="logo"></div>
        <br/><br/>
        <div>
          <h2>Log in to your account.</h2>
          <div role="form" className="form-horizontal">
            <div className="form-body">
              <div className="form-group">
                <input type="text" name="userName" placeholder="Username" className="form-control" value={this.state.userName} onChange={this.onChange.bind(this)}/>
              </div>
              <div className="form-group">
                <input type="password" name="pass" placeholder="Password" className="form-control" value={this.state.pass} onChange={this.onChange.bind(this)}/>
              </div>
              <div className="form-group">
                <div className="pull-left">
                  <label>
                    <input type="checkbox" className="form-chkbox" /> Remember me.
                  </label>
                </div>
                <div className="pull-right">
                <button className="btn blue" onClick={() => this.onSubmit()}>Log in</button>
                </div>
              </div>
            </div>
          </div>
          <br /><br />
          <div>
            <label>Forgot your password?</label>
          </div>
          <div>
            <label>No worries. Click <a className="blue-text" href=""><u>here</u></a> to reset your password. </label>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  return {
          auth: state.auth
        };
}

export default connect(mapState,actions)(Login);
