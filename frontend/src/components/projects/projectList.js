import React, { Component } from "react";
import { connect } from "react-redux";
import { getProject, searchProject } from "../../actions/projects";
import M from "materialize-css";
import EachProject from "./eachProject";

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.handleonChange = this.handleonChange.bind(this);
    this.handleonSubmit = this.handleonSubmit.bind(this);
  }

  state = {
    description: "",
    category: "",
    order_by: "",
    sorting: "",
  };

  componentWillMount() {
    this.props.getProject();
  }

  componentDidMount() {
    // Auto initialize all the materailize css!
    M.AutoInit();
  }

  handleonChange = (e) => {
    // get target element name
    this.setState({ [e.target.name]: e.target.value });
  };

  handleonSubmit = (e) => {
    e.preventDefault();
    const { description, category, order_by, sorting } = this.state;
    console.log(this.state);
    this.props.searchProject({ description, category, order_by, sorting });
  };

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <form
                className="col s12"
                onSubmit={(e) => this.handleonSubmit(e)}
              >
                <div className="input-field" style={{ marginBottom: "30px", marginTop: "30px" }}>
                  <input
                    type="text"
<<<<<<< HEAD
                    placeholder="SEARCH BY DESCRIPTION"
=======
                    // placeholder="TYPE THE DESCRIPTION FOR YOUR PROJECT"
>>>>>>> origin
                    name="description"
                    onChange={(e) => this.handleonChange(e)}
                    id="type_description"
                  />
                  <label for="type_description">TYPE THE DESCRIPTION FOR YOUR PROJECT</label>
                </div>
<<<<<<< HEAD
                <div className="row">
                  <div style={{ marginBottom: "10px" }} className="col s4">
                    <label className="left">SELECT CATEGORY</label>
                    <select
                      className="browser-default"
                      onChange={(e) => this.handleonChange(e)}
                      name="category"
                    >
                      <option value="">Choose your option</option>
                      <option value="1">All other</option>
                      <option value="2">A web based application</option>
                      <option value="3">A desktop application</option>
                      <option value="4">A mobile application</option>
                      <option value="5">
                        A library for other project to reference
                      </option>
                      <option value="6">
                        A modification to existing platform
                      </option>
                      <option value="7">A research oriented project</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "10px" }} className="col s4">
                    <label className="left">SORTING ORDER</label>
                    <select
                      className="browser-default"
                      onChange={(e) => this.handleonChange(e)}
                      name="order_by"
                    >
                      <option value="">Choose your option</option>
                      <option value="last_update">last_update</option>
                      <option value="project_title">project_title</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: "10px" }} className="col s4">
                    <label className="left">ASCENDING/DESCENDING</label>
                    <select
                      className="browser-default"
                      onChange={(e) => this.handleonChange(e)}
                      name="sorting"
                      required
                    >
                      <option value="">Choose your option</option>
                      <option value="ASC">ASC</option>
                      <option value="DESC">DESC</option>
                    </select>
                  </div>
=======
                <div className="input-field"
                     style={{ marginBottom: "30px" }}>
                  <select
                    onChange={(e) => this.handleonChange(e)}
                    name="category"
                    id="category"
                  >
                    <option value="">Choose your option</option>
                    <option value="1">All other</option>
                    <option value="2">A web based application</option>
                    <option value="3">A desktop application</option>
                    <option value="4">A mobile application</option>
                    <option value="5">
                      A library for other project to reference
                    </option>
                    <option value="6">
                      A modification to existing platform
                    </option>
                    <option value="7">A research oriented project</option>
                  </select>
                  <label  for="category" className="left">
                    SELECT THE CATEGORY FOR YOUR PROJECT
                  </label>
                </div>

                <div className="input-field" style={{ marginBottom: "30px" }}>
                  <select
                    onChange={(e) => this.handleonChange(e)}
                    name="order_by"
                    id="sorting_order"
                  >
                    <option value="">Choose your option</option>
                    <option value="last_update">last_update</option>
                    <option value="project_title">project_title</option>
                  </select>
                  <label for="sorting_order" className="left">SORTING ORDER</label>
                </div>

                <div className="input-field" style={{ marginBottom: "30px" }}>
                  <select
                    onChange={(e) => this.handleonChange(e)}
                    name="sorting"
                    required
                    id="asending_desending"
                  >
                    <option value="">Choose your option</option>
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                  </select>
                  <label for="asending_desending" className="left">ASCENDING/DESCENDING</label>
>>>>>>> origin
                </div>

                <input
                  type="submit"
<<<<<<< HEAD
                  className="btn btn-small right"
=======
                  className="btn btn-primary right blue-grey darken-1"
>>>>>>> origin
                  value="Search"
                />
              </form>
            </div>
          </div>
          <div className="flexLayout">
            {this.props.ProjectLists.map((each, index) => {
              return (
                <EachProject
                  title={each.title}
                  category={each.category}
                  description={each.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  ProjectLists: state.project.ProjectLists,
});

export default connect(mapStateToProps, { getProject, searchProject })(
  ProjectList
);
