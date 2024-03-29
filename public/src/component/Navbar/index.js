import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { MDCMenuSurface } from "@material/menu-surface";
import { load, remove } from "../../redux/actions/user";
import "./style.scss";
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      user: { avatar: null }
    };
  }
  componentDidMount() {
    const token = localStorage.token;
    const search = document.querySelector(".searh-input");
    const searchContainer = document.querySelector(".search");
    const searchC = document.querySelector(".search-container");
    search.addEventListener("focus", _ => {
      searchContainer.classList.add("focused");
    });
    search.addEventListener("blur", _ => {
      searchContainer.classList.remove("focused");
      searchC.classList.remove("show");
    });
    token ? this.props.load() : console.log("no user");
  }
  search = e => {
    var value = e.target.value;
    this.setState({ search: value });
  };
  clear = () => {
    this.setState({ search: "" });
  };
  show = () => {
    const search = document.querySelector(".searh-input");
    const searchContainer = document.querySelector(".search-container");
    searchContainer.classList.add("show");
    search.focus();
  };
  profile = () => {
    const menu = new MDCMenuSurface(document.querySelector("#profile-menu"));
    menu.open();
  };
  componentDidUpdate(oldProps) {
    const data = this.props.data;
    if (oldProps.data !== data) {
      this.setState({ user: data });
    }
  }
  avatarStyle = {
    backgroundImage: `url("https://lh3.googleusercontent.com/-FThbTS-wmx8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf46rjWVcYKAUIE-QGgeawdHqQB2Q.CMID/s32-c/photo.jpg")`
  };
  render() {
    const { search, user } = this.state;
    const token = localStorage.token;
    return (
      <header className="mdc-top-app-bar dev-nav" id="header">
        <div className="mdc-top-app-bar__row">
          <section className="nav-section-container">
            <section className="nav-section section-start">
              <button
                className="material-icons mdc-icon-button"
                id="drawer-button"
              >
                menu
              </button>
              <span className="mdc-top-app-bar__title">Title</span>
            </section>
            <section className="nav-section section-middle">
              <div className={`search-container ${search ? "has-text" : ""}`}>
                <div className="search">
                  <div className="search-button">
                    <button className="mdc-icon-button material-icons">
                      search
                    </button>
                  </div>
                  <div id="search">
                    <div className="search-r">
                      <input
                        className="searh-input"
                        type="search"
                        value={search}
                        placeholder="Search Course"
                        onChange={this.search}
                      />
                    </div>
                  </div>
                  <div className="search-button">
                    <button
                      className={`mdc-icon-button material-icons ${
                        search ? "" : "hidden"
                      }`}
                      onClick={this.clear}
                    >
                      clear
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="mdc-icon-button material-icons-outlined"
                  id="search-trigger"
                  onClick={this.show}
                >
                  search
                </button>
                <Link
                  to="/courses"
                  className="mdc-icon-button material-icons-outlined"
                >
                  collections_bookmark
                </Link>
                <Link
                  to="/instructor"
                  className="mdc-icon-button material-icons-outlined"
                >
                  school
                </Link>
              </div>
            </section>
            <section className="nav-section section-end">
              {token ? (
                <div className="mdc-menu-surface--anchor">
                  <button
                    className={`mdc-icon-button ${
                      user.avatar ? "has-avatar" : "avatar-button"
                    }`}
                    onClick={this.profile}
                  >
                    <i className="material-icons-outlined">account_circle</i>
                    <div className="avatar">
                      <span style={this.avatarStyle} />
                    </div>
                  </button>
                  {/* menu */}
                  <div className="mdc-menu-surface" id="profile-menu">
                    <div className="nav-info">
                      <span className="fx">
                        <span className="text-midnight ellipsis">
                          {user ? user.username : "-"}
                        </span>
                        <span className="a11 text-midnight-lighter ellipsis">
                          {user ? user.email : "-"}
                        </span>
                      </span>
                    </div>
                    <ul className="mdc-list dev-list">
                      <li className="mdc-list-item" tabIndex="0">
                        <span className="mdc-list-item__text">Account</span>
                      </li>
                      <li
                        className="mdc-list-item"
                        onClick={() => this.props.remove()}
                      >
                        <span className="mdc-list-item__text">Log out</span>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="user-button">
                  <Link to="/login" className="mdc-button">
                    Sign in
                  </Link>
                </div>
              )}
            </section>
          </section>
        </div>
      </header>
    );
  }
}
const mapStore = state => {
  return {
    data: state.user.user
  };
};
export default connect(
  mapStore,
  { load, remove }
)(Navbar);
