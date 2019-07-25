import React, { Component } from "react";
import { MDCRipple } from "@material/ripple";
import "./App.css";
import { Login, Register, Home, Instructor } from "./container";
import { Navbar } from "./component";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { load } from "./redux/actions/user";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const buttons = document.querySelectorAll(".mdc-button");
    const icons = document.querySelectorAll(".mdc-icon-button");
    icons.forEach(icon => {
      new MDCRipple(icon).unbounded = true;
    });
    buttons.forEach(button => {
      new MDCRipple(button);
    });
    this.props.load();
  }
  render() {
    return (
      <Router>
        <Navbar />
        <div className="main">
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/instructor" component={Instructor} />
        </div>
      </Router>
    );
  }
}
export default connect(
  null,
  { load }
)(App);
