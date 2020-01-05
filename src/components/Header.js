import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { signOut } from '../actions';


class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  handleLogout = () => {
  this.props.signOut();
}

  render() {
    return (
      <div style={{}} className="ui segment">
        <div className="ui secondary menu">
          <img src={require('../resources/logo1.png')}  alt="Logo"/>
          <a className="item" style={{hover:"red"}} >
            Home
          </a>
          <a className="item">
            Create Account
          </a>
          <a className="item">
            Assessment
          </a>
          <a className="item">
            Search Facilities
          </a>
          <a className="item">
            More Information
          </a>
          <div class="right menu">
            <Link onClick={this.handleLogout} to='/' className="item ">
              Logout
            </Link>
              </div>
        </div>
      </div>
    );
  };
}

export default connect(null, { signOut })(Header);
