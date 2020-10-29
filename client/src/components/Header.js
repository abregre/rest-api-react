import React, { Component } from 'react';
import './header.css';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <a href=".">
          <AssignmentIcon fontSize="large" className="header-logo" />
          <h4>Articles Api</h4>
        </a>
      </header>
    );
  }
}
