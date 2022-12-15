import { useDispatch, useSelector } from "react-redux";
import { setAlertModal } from "../../redux/slices/modalSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

const AlertModal = () => {

  const alert = useSelector((state) => state.modal?.alertModal)
  const dispatch = useDispatch()
  const closeModal = () => {
    dispatch(
      setAlertModal({
        status: false,
        message: "",
        type: "",
      })
    );
  };

  return (
    alert?.status && (
      <div className="alert-modal ">
        <div className="alert-modal-overlay"></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div
              style={{padding:"17px"}}
                className={`alert-modal-icon ${
                  alert.type === "Success" ? "bg-success" : "bg-danger"
                }`}
              >
                {alert.type === "Success" ? (
                  <i className="fa fa-check text-center"><FaCheck/></i>
                ) : (
                  <i className="fa fa-check"><FaTimes/></i>
                )}
              </div>
            <h4 className='text-success'>{alert?.type}</h4>
            <p style={{ lineHeight: "30px" }}>

            {alert?.message}
          

            </p>

            <div className="alert-modal-button mt-3">
              <button onClick={closeModal} className="btn btn-dark py-3" >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default AlertModal;
