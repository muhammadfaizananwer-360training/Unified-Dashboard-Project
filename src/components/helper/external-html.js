import React, { Component } from 'react';

class ExternalHtml extends Component {

    render()
    {
      var Iframe=this.props.iframe;
      return <Iframe src={this.props.src} height={this.props.height} width={this.props.width}/>;
    }
}

export default ExternalHtml;
