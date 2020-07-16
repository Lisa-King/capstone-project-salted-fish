import React, { useState } from "react";
import M from "materialize-css";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class CollaInfo extends React.Component {
  constructor() {
    super();
  }

  state = {
    info: [],
  };

  async componentDidMount() {
    // Auto initialize all the materailize css!
    M.AutoInit();
    const a = localStorage.getItem("token");

    const config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "AUTH-KEY": a,
      },
    };
    const url = "/collaborator/" + this.props.id;
    const res = await axios.get(url, config);
    this.setState({ info: res.data });
  }

  async update(e) {
    console.log(1);
  }

  render() {
    const category_list = [
      "All other",
      "A web based application",
      "A desktop application",
      "A mobile application",

      "A library for other project to reference",

      "A modification to existing platform",
      "A research oriented project",
    ];
    const a = { 0: "entry", 1: "medium", 2: "senior", 3: "professional" };
    const url =
      "https://api.adorable.io/avatars/140/" + Math.floor(Math.random() * 500);
    const skill_list = [
      "Web Development",
      "Java",
      "Python",
      "PHP",
      "Script Language",
      "Database Management",
      "Computer Vision",
      "Security Engineering",
      "Testing",
      "Algorithm Design",
      "Operating System",
      "Data Science",
      "Human Computer Interaction",
      "Deep Learning/Neural Network",
      "Distribution System",
    ];
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <header>
          <div className="navbar-fixed" style={{ position: "fixed" }}>
            <Link data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
          </div>
          <div>
            <ul
              id="nav-mobile"
              className="sidenav sidenav-fixed"
              style={{ position: "fixed" }}
            >
              <li className="bold">
                <Link className="waves-effect waves-teal" to="./colladash">
                  My Projects
                </Link>
              </li>
              <li className="bold">
                <Link className="waves-effect waves-teal" to="./crecommend">
                  Recommend Projects
                </Link>
              </li>

              <li className="bold">
                <Link className="waves-effect waves-teal" to="./apply">
                  Apply Projects
                </Link>
              </li>

              <li className="bold">
                <Link className="waves-effect waves-teal" to="./invited">
                  Invited Projects
                </Link>
              </li>

              <li className="bold">
                <Link className="waves-effect waves-teal" to="./cinfo">
                  My Info
                </Link>
              </li>

              <div className="logo">
                <h3>Logo</h3>
              </div>
            </ul>
          </div>
        </header>

        <main>
          <div className="container">
            <div className="row">
              <div className="col s12 l12 dashboard">
                <div className="card grey lighten-3">
                  <div className="card-content posts">
                    <nav className="pink darken-1">
                      <div className="nav-wrapper">
                        <h4 className="left event-title">EVENTS</h4>
                        <form className="search-field right">
                          <div className="input-field">
                            <input id="search" type="search" required />
                            <label
                              className="label-icon search-icon"
                              for="search"
                            >
                              <i className="material-icons">search</i>
                            </label>
                            <i className="material-icons close-icon">close</i>
                          </div>
                        </form>
                      </div>
                    </nav>
                    <div className="container1">
                      <div className="cover-photo">
                        <img src={url} className="profile" />
                      </div>
                      <div className="profile-name">{this.state.info.Name}</div>
                      <p className="about">
                        This is {this.state.info.Name}'s profile as a
                        collaborator {this.state.info.Description}
                      </p>
                      <button
                        className="msg-btn button1"
                        onClick={(e) => this.update(e)}
                      >
                        update
                      </button>

                      <div>
                        <div>
                          <i className="fab material-icons icon">call</i>{" "}
                          <span style={{ position: "relative", bottom: "6px" }}>
                            {this.state.info.Phone_no}
                          </span>
                        </div>
                        <div>
                          <i className="fab material-icons icon">email</i>{" "}
                          <span style={{ position: "relative", bottom: "6px" }}>
                            {this.state.info.Email}
                          </span>
                        </div>
                        <div>
                          <i className="fab material-icons icon">
                            perm_identity
                          </i>{" "}
                          <span style={{ position: "relative", bottom: "6px" }}>
                            {this.state.info.Education}
                          </span>
                        </div>
                        <div>
                          <i className="fab material-icons icon">trending_up</i>{" "}
                          <span style={{ position: "relative", bottom: "4px" }}>
                            {a[this.state.info.User_level]}
                          </span>
                        </div>
                        <div>
                          <i className="fab material-icons icon">grade</i>{" "}
                          <span style={{ position: "relative", bottom: "4px" }}>
                            {this.state.info.Skills &&
                              Object.keys(this.state.info.Skills).map((key) => {
                                return (
                                  <span>
                                    {skill_list[key]}:{" "}
                                    {this.state.info.Skills[key]} years{" "}
                                  </span>
                                );
                              })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  id: state.auth.id,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, null)(CollaInfo);
