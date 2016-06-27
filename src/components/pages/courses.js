import React, { Component } from 'react';

class Courses extends Component {
  render() {
    return (
      <div>
        <h1 className="page-heading">My Courses</h1>
        <div className="row statistics">
  				<div className="col-xs-6 col-sm-4">
  				  <div className="placeholder">
  					<h4>11</h4>
  					<span>Number Of My Courses</span>
  				  </div>
  				</div>
  				<div className="col-xs-6 col-sm-4">
  				  <div className="placeholder">
  					  <h4>3,456</h4>
  					  <span>Courses In Your Subscription</span>
  				  </div>
  				</div>
  				<div className="col-xs-12 col-sm-4">
  				  <div className="placeholder">
  					  <h4>2</h4>
  					  <span>Courses You&#39;ve Completed</span>
  				  </div>
  				</div>
  			</div>
      </div>
    );
  }
}

export default Courses;
