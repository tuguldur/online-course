import React, { Component } from "react";
// import { MDCSnackbar } from "@material/snackbar";
import { Snackbar } from "@material/react-snackbar";
import { connect } from "react-redux";
import { clear } from "../../redux/actions/main";
class SnackbarNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
      open: false
    };
  }
  componentDidUpdate(oldProps) {
    const data = this.props.error;
    if (oldProps.error !== data && data) {
      this.setState({ error: data, open: true });
    }
  }
  close = () => {
    this.setState({ open: false });
    this.props.clear();
  };
  render() {
    const { open, error } = this.state;
    return <Snackbar message={error} onClose={this.close} open={open} />;
  }
}
const mapStore = state => {
  return {
    error: state.home.error
  };
};
export default connect(
  mapStore,
  { clear }
)(SnackbarNotification);
