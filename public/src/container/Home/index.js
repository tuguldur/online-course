import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
class Home extends Component {
  state = { user: null };
  render() {
    return (
      <div>
        <span role="img" aria-label="😀😀😀">
          😀😀😀
        </span>
      </div>
    );
  }
}
const mapStore = state => ({
  user: state.user
});
export default connect(
  mapStore,
  null
)(Home);
