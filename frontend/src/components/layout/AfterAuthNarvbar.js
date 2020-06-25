import React from "react";
import CollaNav from "./collaNav";
import DreamerNav from "./dreamerNav";
import { connect } from "react-redux";

const AfterAuthNarvbar = (props) => {
  const { isDreamerOrCollaOrAdmin } = props;
  if (isDreamerOrCollaOrAdmin == "Dreamer") {
    return (
      <div>
        <DreamerNav />
      </div>
    );
  } else if (isDreamerOrCollaOrAdmin == "Collaborator") {
    return (
      <div>
        <CollaNav />
      </div>
    );
  } else {
    // admin
    return;
  }
};

const mapStateToProps = (state) => ({
  isDreamerOrCollaOrAdmin: state.auth.role,
});

export default connect(mapStateToProps, null)(AfterAuthNarvbar);
