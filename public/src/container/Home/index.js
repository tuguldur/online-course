import React, { Component } from "react";
import "./style.css";
import { connect } from "react-redux";
// import { Link } from "react-router-dom";
import { remove } from "../../redux/actions/user";
class Home extends Component {
  state = { user: null };
  componentDidMount() {
    const { user } = this.props;
    this.setState({ user });
    console.log(user);
  }
  componentWillReceiveProps() {}
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
const mapStore = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStore,
  { remove }
)(Home);
