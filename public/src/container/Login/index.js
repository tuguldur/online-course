import React, { Component } from "react";
import { connect } from "react-redux";
import { save } from "../../redux/actions/user";
import "./style.css";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      email_error: "",
      password_error: ""
    };
  }
  componentWillMount() {
    const token = localStorage.token;
    token ? this.props.history.push("/") : console.log("you can go");
  }
  email = evt => {
    this.setState({ email: evt.target.value });
  };
  password = evt => {
    this.setState({ password: evt.target.value });
  };
  submit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("/api/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ email: email, password: password })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ email_error: "", password_error: "" });
        if (response.email) this.setState({ email_error: response.email });
        if (response.password)
          this.setState({ password_error: response.password });
        if (response.token) {
          this.props.save(response);
          window.location.replace("/");
        } else console.warn("Authentication Failed!");
      })
      .catch(err => {
        // console.log(err);
      });
  };
  render() {
    const { email_error, password_error } = this.state;

    return (
      <div className="left-split">
        <div id="form-container">
          <form className="register-from form-auth" onSubmit={this.submit}>
            <div className="form-center">
              <div className="form-title">Welcome back!</div>
              <div className="subtitle">We're so excited to see you again!</div>
              <div className="form-input mt-20">
                <div className={`mb-20 ${email_error ? "error" : ""}`}>
                  <h5 className="input-title">
                    Email
                    <span className="error-text">
                      <span className="spec">-</span>
                      {email_error}
                    </span>
                  </h5>
                  <div className="input-wrapper">
                    <input
                      type="email"
                      className="dark-input"
                      name="email"
                      onChange={this.email}
                    />
                  </div>
                </div>
                <div className={`mb-20 ${password_error ? "error" : ""}`}>
                  <h5 className="input-title">
                    Password
                    <span className="error-text">
                      <span className="spec">-</span>
                      {password_error}
                    </span>
                  </h5>
                  <div className="input-wrapper">
                    <input
                      type="password"
                      className="dark-input"
                      name="password"
                      onChange={this.password}
                    />
                  </div>
                </div>
                <button className="btn btn-link mt-4 mb-20">
                  <div type="button" className="button-text">
                    Forgot your password?
                  </div>
                </button>
                <button type="submit" className="form-button btn mb-8">
                  <div className="button-text">Login</div>
                </button>
                <div className="mt-4">
                  <span className="need-account">Need an account?</span>
                  <button type="button" className="btn btn-small-text btn-link">
                    <div
                      className="btn-text"
                      onClick={() => this.props.history.push("/register")}
                    >
                      Register
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStore = state => {
  return {
    token: state.token
  };
};

export default connect(
  mapStore,
  { save }
)(Login);
