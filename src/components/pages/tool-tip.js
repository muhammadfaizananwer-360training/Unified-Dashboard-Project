import React, { Component } from 'react';

class ToolTip extends Component {
  render() {
    return (
      <div className={'tooltip '+this.props.pos} style={this.props.css} role="tooltip">
        <div className="tooltip-arrow"></div>
        <div className="tooltip-inner">
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default ToolTip;
