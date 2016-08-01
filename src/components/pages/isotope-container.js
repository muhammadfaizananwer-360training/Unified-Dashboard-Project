import React, { Component } from 'react';
import IsoContent from './isotope-content';
var inst;

class IsoContainer extends Component {

  componentWillMount()
  {
    inst = this;
    this.state = {
      "menu_open":false,
      "affix":false
    }
  }

  componentDidMount()
  {
    document.getElementById("wrapper").addEventListener('scroll',this.handleScroll);
  }

  componentWillUnmount()
  {
    document.getElementById("wrapper").removeEventListener('scroll',this.handleScroll);
  }

  onClickMenu()
  {
    this.setState({"menu_open":!this.state.menu_open});
  }

  handleScroll(e)
  {
    if(e.target.scrollTop < 200)
    {
      if(inst.state.affix)
      {
        //console.log(1);
        inst.setState({"affix":false});
      }
    }
    else if(!inst.state.affix)
    {
      //console.log(2);
      inst.setState({"affix":true});
    }
  }

  render() {
    return (
      <div className={"iso-container "+(this.state.affix?"fixed":"")}>
				<ul className="iso-header">
					<li className="search">
						<input type="text" className="form-control" placeholder="Search Your Courses By Keyword"></input>
					</li>
					<li className="filters">
						<button type="button" className="active" data-filter="*">All</button>
						<button type="button" data-filter=".new">New</button>
						<button type="button" data-filter=".started">Started</button>
						<button type="button" data-filter=".completed">Completed</button>
						<button type="button" data-filter=".subscription">Subscription</button>
					</li>
					<li className={"sorting "+(this.state.menu_open?"open":"")}>
						<button onClick={() => this.onClickMenu()} data-toggle="dropdown" className="dropdown-toggle" type="button"></button>
						<ul role="menu" className="dropdown-menu dropdown-menu-right">
							<li><a href="#">Sort Ascending (A-Z)</a></li>
							<li><a href="#">Sort Descending (Z-A)</a></li>
						</ul>
					</li>
          <li className={"merge-filter-sorting "+(this.state.menu_open?"open":"")}>
            <button onClick={() => this.onClickMenu()} data-toggle="dropdown" className="dropdown-toggle" type="button"></button>
            <ul role="menu" className="dropdown-menu dropdown-menu-right">
              <li><a href="#">All</a></li>
              <li><a href="#">New</a></li>
              <li><a href="#">Started</a></li>
              <li><a href="#">Completed</a></li>
              <li><a href="#">Subscription</a></li>
              <li className="divider"></li>
              <li><a href="#">Sort Ascending (A-Z)</a></li>
              <li><a href="#">Sort Descending (Z-A)</a></li>
            </ul>
					</li>
				</ul>
        <IsoContent />
			</div>
    );
  }
}
export default IsoContainer;
