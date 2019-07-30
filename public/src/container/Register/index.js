import React, { Component } from "react";
import { connect } from "react-redux";
import { error } from "../../redux/actions/main";
import "./style.css";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      email_error: "",
      username_error: "",
      password_error: ""
    };
  }
  componentWillMount() {
    const token = localStorage.token;
    token ? this.props.history.push("/") : console.log("you can go");
    const header = document.querySelector(".dev-nav");
    console.log(header);
  }
  email = evt => {
    this.setState({ email: evt.target.value });
  };
  username = evt => {
    this.setState({ username: evt.target.value });
  };
  password = evt => {
    this.setState({ password: evt.target.value });
  };
  submit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;
    fetch("/api/register", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        username: username.trim(),
        password: password
      })
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          email_error: "",
          username_error: "",
          password_error: ""
        });
        if (response.email) this.setState({ email_error: response.email });
        if (response.username)
          this.setState({ username_error: response.username });
        if (response.password)
          this.setState({ password_error: response.password });
        if (response.msg) this.props.history.push("/login");
        else console.warn("Registration Failed!");
      })
      .catch(err => this.props.error("Something went wrong. but we're on it."));
  };
  render() {
    const { email_error, username_error, password_error } = this.state;
    return (
      <div className="left-split">
        <div id="form-container">
          <form className="register-from form-auth" onSubmit={this.submit}>
            <div className="form-center">
              <div className="form-title">Create an account</div>
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
                      onChange={this.email}
                      name="email"
                    />
                  </div>
                </div>
                <div className={`mb-20 ${username_error ? "error" : ""}`}>
                  <h5 className="input-title">
                    Username
                    <span className="error-text">
                      <span className="spec">-</span>
                      {username_error}
                    </span>
                  </h5>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="dark-input"
                      onChange={this.username}
                      name="username"
                    />
                  </div>
                </div>
                <div className={password_error ? "error" : ""}>
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
                      onChange={this.password}
                      name="password"
                    />
                  </div>
                </div>
                <div className="mt-20">
                  <button type="submit" className="form-button btn">
                    <div className="button-text">Continue</div>
                  </button>
                  <button className="btn btn-link mt-8">
                    <div
                      className="button-text"
                      type="button"
                      onClick={() => this.props.history.push("/login")}
                    >
                      Already have an account?
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

export default connect(
  null,
  { error }
)(Register);
