import React from "react";
import Heading from "../components/Heading";

const Profile = () => {
  return (
    <>
      <div className="container-fluid p-0 dashboard">
        <div className="row">
          <div className="col-xl-3"></div>
          <div className="col-xl-6 col-xxl-6 d-flex">
            <div className="w-100">
              <Heading heading="Profile" />
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Ranjit"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="ranjit@gmail.com"
                        readOnly
                      />
                    </div>
                    <div className="col-sm-6 mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={"dafaff"}
                        readOnly
                      />
                    </div>
                    {/* <div className="col-sm-6 mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        value={"dafaff"}
                        readOnly
                      />
                    </div> */}

                    <div className="col-sm-12 mb-3">
                      <button type="submit" className="btn btn-info w-100">
                        Edit Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
