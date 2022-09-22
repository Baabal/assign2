import React from "react";

import { Redirect } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import Data from "./Data";
const _ = require("lodash");


class DashBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: this.props.name,
      board: [],
      boardItem: "",
      toggle: false,
      submit: true,
      logout: false,
      loggedInUserObj: {},
    };
  }

  onLogoutYes = () => {
    this.setState({ submit: false });
    this.setState({ toggle: true });
    const userObj = JSON.parse(
      localStorage.getItem(_.get(this.state.loggedInUserObj, "email", ""))
    );
    userObj.isUserLoggedIn = false;
    localStorage.setItem(
      _.get(this.state.loggedInUserObj, "email", ""),
      JSON.stringify(userObj)
    );
  };

  onLogout = () => {
    this.setState({
      logout: !this.state.logout,
    });
  };

  componentDidMount() {
    const loggedInemail = _.get(this.props.location, "state.email", {});
    this.setState({
      loggedInUserObj: JSON.parse(localStorage.getItem(loggedInemail)),
    });
  }

  render() {
    const lEmail = `${_.get(
      this.state.loggedInUserObj,
      "firstName",
      ""
    )} ${_.get(this.state.loggedInUserObj, "lastName", "")}`;

    return (
      <div>
        <div>
          <div className="mt-5 text-center">
            <button
              className="btn btn-dark btn-lg"
              type="button"
              onClick={this.onLogout}
            >
              Logout
            </button>            
          </div>
        </div>

        <div className="container">
          <h1 className="mt-5 text-center">Hi {lEmail}</h1>
 
        </div>
        <Data />
        {!this.state.submit ? <Redirect to={`/`} /> : null}
        {this.state.logout ? (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes"
            confirmBtnBsStyle="danger"
            title="Pakka?"
            onConfirm={this.onLogoutYes}
            onCancel={this.onLogout}
            focusCancelBtn
          ></SweetAlert>
        ) : (
          ""
        )}


      </div>
    );
  }
}

export default DashBoard;
