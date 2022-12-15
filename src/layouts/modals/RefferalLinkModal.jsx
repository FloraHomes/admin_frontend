import { useDispatch, useSelector } from "react-redux";
import { setRefferalLinkModal } from "../../redux/slices/modalSlice";
import { FaCheck } from "react-icons/fa";
import { SITE_URL } from "../../config/settings";

const RefferalLinkModal = () => {
  const refferalLinkModal = useSelector(
    (state) => state.modal?.refferalLinkModal
  );
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(
      setRefferalLinkModal({
        status: false,
      })
    );
  };

  const user = useSelector((state) => state?.user?.user);
  return (
    refferalLinkModal?.status && (
      <div className="alert-modal ">
        <div className="alert-modal-overlay"></div>
        <div className="alert-modal-card vivify popInBottom">
          <div className="close-alert-button"></div>

          <div className="alert-modal-body">
            <br />

            <div className="alert-modal-icon bg-success">
              <i className="fa fa-check text-center">
                <FaCheck />
              </i>
            </div>

            <h4 className="text-success">Your Refferal Link</h4>
            <p style={{ lineHeight: "30px" }}>
             {`http://localhost:3000/own-earner-register/${user?.firstName}/${user?._id}`}
            </p>

            <div className="alert-modal-button mt-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${SITE_URL}/own-earner-register/${user?.firstName}/${user?._id}`
                  );
                  closeModal();
                }}
                className="btn btn-dark py-3"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default RefferalLinkModal;
