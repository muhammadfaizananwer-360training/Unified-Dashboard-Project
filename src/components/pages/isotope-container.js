import React, { Component } from 'react';
import IsoContent from './isotope-content';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class IsoContainer extends Component {

  componentWillMount()
  {
    this.state = {
      "menu_open":false,
      "affix":false,
      "list":[],
      "loadMore":false,
      "isLoading":false,
      "pageNo":0,
      "pageSize":20,
      "sortBy":"asc",
      "filterBy":"all",
      "search":""
    }
    this.fetchIsotopeData();
  }

  componentDidMount()
  {
    this.handleScroll = this.handleScroll.bind(this);
    document.getElementById("wrapper").addEventListener('scroll',this.handleScroll);
  }

  componentWillUnmount()
  {
    document.getElementById("wrapper").removeEventListener('scroll',this.handleScroll);
    this.props.clearState("ISOTOPE");
  }

  componentWillReceiveProps(nextProps)
  {
    if(nextProps.isotope != "")
    {
      this.setState({"list": this.state.list.concat(nextProps.isotope)});
    }
    this.setState({"isLoading":false});
  }

  fetchIsotopeData()
  {
    if(!this.state.isLoading)
    {
      this.props.getIsotope();
      this.setState({"isLoading":true});
    }
  }

  onClickMenu()
  {
    this.setState({"menu_open":!this.state.menu_open});
  }

  handleScroll(e)
  {
    var el = e.target;
    if(el.scrollTop < 200)
    {
      (this.state.affix?this.setState({"affix":false}):"");
    }
    else
    {
      (!this.state.affix?this.setState({"affix":true}):"");

      //  At Bottom
      if(el.offsetHeight-el.scrollHeight+el.scrollTop>-5)
      {
        this.fetchIsotopeData();
      }
    }
  }

  onSearch(event)
  {
    this.setState({"search": event.target.value});
  }

  render()
  {
    return (
      <div className={"iso-container "+(this.state.affix?"fixed":"")}>
				<ul className="iso-header">
					<li className="search">
						<input type="text" className="form-control" placeholder="Search Your Courses By Keyword" onChange={this.onSearch.bind(this)}></input>
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
        <IsoContent isotope={this.state.list} isLoading={this.state.isLoading} getModal={this.props.getModal}/>
			</div>
    );
  }
}

function mapStatToProps(state)
{
    return {"isotope":state.isotope,"currentDate":state.branding.serverCurrentDate};
}

export default connect(mapStatToProps,actions)(IsoContainer);
