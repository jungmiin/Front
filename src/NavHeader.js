import * as React from "react";
import logo from "./asset/TalkingHandLogo.svg";

function NavHeader() {
  return (
    <div className="container-fluid text-center">
      <div className="row m-4 mb-5">
        <div className="col-md-2 fw-bold" style={{ color: "#00A2FF" }}>
          <img src={logo} />
        </div>
        <div className="col-md-8"></div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default NavHeader;
