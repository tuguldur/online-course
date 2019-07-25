import React, { Component } from "react";
import { Link } from "react-router-dom";
import { MDCMenuSurface } from "@material/menu-surface";
import "./style.scss";
class Navbar extends Component {
  state = {
    search: "",
    avatar:
      "https://lh3.googleusercontent.com/-FThbTS-wmx8/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf46rjWVcYKAUIE-QGgeawdHqQB2Q.CMID/s32-c/photo.jpg"
  };
  componentDidUpdate() {
    // console.log(this.state.search);
  }
  componentDidMount() {
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
  }
  search = e => {
    var value = e.target.value;
    this.setState({ search: value });
  };
  clear = () => {
    this.setState({ search: "" });
  };
  avatarStyle = {
    backgroundImage: `url(${this.state.avatar})`
  };
  show = () => {
    console.log("s");
    const search = document.querySelector(".searh-input");
    const searchContainer = document.querySelector(".search-container");
    searchContainer.classList.add("show");
    search.focus();
  };
  profile = () => {
    console.log("Menu will open now..");
    const menu = new MDCMenuSurface(document.querySelector("#profile-menu"));
    menu.open();
  };
  render() {
    const { search } = this.state;
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
                <div className="avatar-container">
                  <div className="p-relative avatar-image">
                    <div className="mdc-menu-surface--anchor">
                      <div className="avatar" onClick={this.profile}>
                        <span style={this.avatarStyle} />
                      </div>
                      <div className="mdc-menu-surface" id="profile-menu">
                        <span>bitch</span>
                      </div>
                    </div>
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

export default Navbar;
