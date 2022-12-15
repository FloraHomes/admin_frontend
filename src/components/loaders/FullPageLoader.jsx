import React from "react";
import { useSelector } from "react-redux";
import  "../../assets/css/components/loader.css"

const FullPageLoader = () => {
  const loader = useSelector((state) => state.modal?.loader)

  return (
    loader?.status ? (
      <div className="page_processing_modal">
        <div className="loading-wrapper">
          <div className="loader">
            <div className="loader loader-inner"></div>
          </div>
        </div>
        <p style={{ paddingLeft: 0 }}>Processing, Please wait...</p>
      </div>
    ): null
  );
};

export default FullPageLoader;
