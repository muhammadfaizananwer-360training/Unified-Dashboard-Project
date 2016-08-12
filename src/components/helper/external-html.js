import React, { Component } from 'react';

class ExternalHtml extends Component {

    render()
    {
      var Iframe=this.props.iframe;
      return <Iframe src={this.props.src} height="100%" width="100%"/>;
    }
}

export default ExternalHtml;
