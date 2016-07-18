import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import IsotopeContainer from './isotope-container';

class Courses extends Component {

  constructor(props) {
    super(props);
    this.props.courseCounters();
  }

  render() {
    return (
      <div>
        <h1 className="page-heading">My Courses</h1>
        <div className="statistics">
  				<div className="statistics-col">
  				  <div className="placeholder">
  					<h4>{this.props.counters.all}</h4>
  					<span>Number Of My Courses</span>
  				  </div>
  				</div>
  				<div className="statistics-col">
  				  <div className="placeholder">
  					  <h4>{this.props.counters.subscriptions}</h4>
  					  <span>Courses In Your Subscription</span>
  				  </div>
  				</div>
  				<div className="statistics-col">
  				  <div className="placeholder">
  					  <h4>{this.props.counters.completed}</h4>
  					  <span>Courses You&#39;ve Completed</span>
  				  </div>
  				</div>
  			</div>
        <IsotopeContainer />
      </div>
    );
  }
}

function mapState(state) {
  return {
          "counters":state.courseCounters
         };
}

export default connect(mapState,actions)(Courses);
