import React from "react";

const LogoBlock = () => {
  return (
    <>
      <div className="col-sm-12 col-md-6 col-lg-7 login-bg p-0">
        <div className="text-center login-left-block">
          <img
            src="/images/logo-white.png"
            alt="logo"
            className="img-fluid my-2"
            style={{ width: "84px" }}
          />
          <h1 className="text-info mt-2 mb-3">
            <b>Track My Money</b>
          </h1>
        </div>
      </div>
    </>
  );
};

export default LogoBlock;
