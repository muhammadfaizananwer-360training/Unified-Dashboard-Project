import React, { Component } from 'react';
import {connect} from 'react-redux';

class ToolTip extends Component {
  render() {
    if(this.props.tooltip.visible)
    {
      return (
        <div className={'tooltip '+this.props.tooltip.pos} style={this.props.tooltip.css} role="tooltip">
          <div className="tooltip-arrow"></div>
          <div className="tooltip-inner">
            {this.props.tooltip.content}
          </div>
        </div>
      );
    }
    else
    {
      return (
        <div></div>
      );
    }
  }
}

function mapState(state) {
    return {
          "tooltip":state.tooltip
         };
}

export default connect(mapState)(ToolTip);
