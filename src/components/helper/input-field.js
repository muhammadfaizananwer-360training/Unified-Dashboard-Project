import React, { Component } from 'react';

class InputField extends Component {

  componentWillMount()
  {
    var cond;
    if(typeof this.props != "undefined")
    {
      cond = (this.props.value.length <= 0);
    }
    else
    {
      cond = true;
    }
    this.state = {
      "status":(cond?"":" up"),
      "placeholder":(cond?"":this.props.placeholder)
    };
  }

  onFocused()
  {
    this.setState({"status":" up"});
    this.setState({"placeholder":this.props.placeholder});
  }

  onBlured()
  {
    //console.log(this.props.value.length);
    if(this.props.value.length <= 0)
    {
      this.setState({"status":" error"});
      this.setState({"placeholder":this.props.msg});
    }
  }

  render()
  {
    return (
      <div className={"animated-input"+this.state.status}
        data-placeholder={this.state.placeholder}>
        <input {...this.props}
          onFocus={() => this.onFocused()}
          onBlur={() => this.onBlured()}/>
      </div>
    );
  }
}

export default InputField;
