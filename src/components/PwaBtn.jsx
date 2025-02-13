import React from "react";
import { usePWAInstall } from "react-use-pwa-install";
const PwaBtn = () => {
  const install = usePWAInstall();
  return (
    <>
      {install && (
        <button className="btn btn-info btn-custom" onClick={install}>
          Install Mobile App
        </button>
      )}
    </>
  );
};

export default PwaBtn;
