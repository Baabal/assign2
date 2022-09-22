import React from "react";

import { Redirect, Link } from "react-router-dom";
import { Formik } from "formik";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submit: false,
    };
  }

  render() {
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
        
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);
            let userObj = localStorage.getItem(values.email);
            if (!userObj) {
              window.alert("Invalid email/Password.");
            } else {
              userObj = JSON.parse(userObj);
              const lEmail = (userObj && userObj.email) || null;
              const lPass =
                (userObj && userObj.password) || null;

              if (
                values.email === lEmail &&
                values.password === lPass
              ) {
                userObj.isUserLoggedIn = true;
                localStorage.setItem(values.email, JSON.stringify(userObj));
                this.setState({ submit: true });
              } else {
                window.alert("Invalid email/Password.");
              }
            }
          }}
        >
          {(props) => (
            <div className="container mt-2 mb-4 divMiddle">
              <div className="col-sm-8 ml-auto mr-auto">
                <h1 className="display-5 text-center pb-5">
                  Login
                </h1>
                <div>
                  <div>
                    <div>                     
                      <form onSubmit={props.handleSubmit}>
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Email 
                           
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.email}
                          />
                        </div>
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Password 
                      
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                          />
                        </div>
                        
                        <div className="form-group">
                          <input
                            type="submit"
                            name="submit"
                            value="Sign In"
                            className="btn btn-dark btn-lg btn-block"
                          />
                        </div>
                      </form>
                      {localStorage.getItem(props.values.email) &&
                      JSON.parse(localStorage.getItem(props.values.email))
                        .isUserLoggedIn ? (
                        <Redirect
                          to={{
                            pathname: "/dashboard",
                            state: { email: props.values.email },
                          }}
                        />
                      ) : null}

                      <div className="form-group">
                          <div className="row">
                            <div className="col text-right text-dark">
                              {" "}
                              <Link className="text-dark" to={"/register"}>Not Registered Click Here!</Link>{" "}
                            </div>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </div>
          )}
        </Formik>
      </div>
    );
  }
}
export default LogIn;
