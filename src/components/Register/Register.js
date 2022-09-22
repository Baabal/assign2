import React from "react";
import { Link } from "react-router-dom";
import { Formik } from "formik";


class Register extends React.Component {
  render() {
    return (
      <div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          
          onSubmit={(values, actions) => {
            actions.setSubmitting(false);

            if (!localStorage.getItem(values.email)) {
              localStorage.setItem(
                values.email,
                JSON.stringify({
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  password: values.password,
                  isUserLoggedIn: false,
                })
              );

              window.alert("User registered successfully.");
              actions.resetForm();
            } else {
              window.alert("email already exists.");
            }
          }}
        >
          {(props) => (
            <div className="container mt-2 mb-4 divMiddle">
              <div className="col-sm-8 ml-auto mr-auto">
              <h1 className="display-5 text-center pb-5">
                        Register
                      </h1>
                  <div>
                    <div >
                     
                      <form onSubmit={props.handleSubmit}>
                        <div className="form-group">
                          <label className="font-weight-bold">
                            First Name
                            
                          </label>
                          <input
                            type="text"
                            name="firstName"
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.firstName}
                          />
                        </div>
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Last Name 
                            
                          </label>
                          <input
                            type="text"
                            name="lastName"
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.lastName}
                          />
                        </div>
                        <div className="form-group">
                          <label className="font-weight-bold">
                            Email
                           
                          </label>
                          <input
                            type="email"
                            name="email"
                            className="form-control"
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
                            name="password"
                            className="form-control"
                            onChange={props.handleChange}
                            onBlur={props.handleBlur}
                            value={props.values.password}
                          />
                        </div>
                       
                        
                        <div className="form-group">
                          <input
                            type="submit"
                            name="signupsubmit"
                            value="Sign Up"
                            className="btn btn-dark btn-lg btn-block"
                          />
                        </div>
                        <div className="col text-right text-dark">
                          <label>
                            
                              <Link className="text-dark"  to={"/"}>Already registered!...Sign In</Link>{" "}
                            
                          </label>
                        </div>
                      </form>
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

export default Register;
