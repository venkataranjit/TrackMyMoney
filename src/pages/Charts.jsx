import React from "react";
import Heading from "../components/Heading";

const Charts = () => {
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-12 col-xxl-12 d-flex">
            <div className="w-100">
              <Heading heading="Charts" />
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title mb-0">Empty card</h4>
                </div>
                <div className="card-body"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Charts;
