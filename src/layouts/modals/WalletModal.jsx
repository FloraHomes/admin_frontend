import React from "react";
import {
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Lucide,
} from "@/base-components";
import { useDispatch, useSelector } from "react-redux";
import { setLoader, setWalletModal } from "../../redux/slices/modalSlice";
import { amountFormat } from "../../utils/format";
import { fundAccount, logWithdrawal } from "../../services/withdrawalService";
import { fetchWithdrawals } from "../../redux/slices/withdrawalSlice";

const WalletModal = () => {
  const modal = useSelector((state) => state.modal?.walletModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setWalletModal({
        status: false,
      })
    );
  };

  const withdrawalRequest = async() => {
    dispatch(setLoader({ status: true }));
    const payload = {
      amount: modal?.balance,
      comment: "Request Pending",
    }
    const res = await logWithdrawal(payload)
    // console.log(res);
    dispatch(fetchWithdrawals())
    closeModal()
    dispatch(setLoader({ status: false }));  
  }

  const fundPropertyAccount = async() => {
    dispatch(setLoader({ status: true }));

    const payload = {
      amount: modal?.balance,
      comment: "Moved to Property Account",
      paymentDate: new Date()
    }

    const res = await fundAccount(payload)
    console.log(res);
    closeModal()
    dispatch(fetchWithdrawals())
    dispatch(setLoader({ status: false })); 


  }

  return (
    <Modal show={modal.status} backdrop="static" onHidden={closeModal}>
      <ModalHeader>
        <h2 className="font-medium text-base mr-auto">Wallet Balance: &#8358;{amountFormat(modal?.balance)}</h2>
      </ModalHeader>

      <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
        <div className="col-span-12 sm:col-span-12">
            <div>
          <button className="btn btn-primary w-full mr-2 mb-2" onClick={() => fundPropertyAccount()} disabled={modal?.balance === 0}>
             Move funds to Property Account
             <Lucide icon="CornerUpRight" className="w-5 h-5 ml-4" />
          </button>
          </div>

          <div>
          <button className="btn btn-success text-white w-full mr-2 mt-2" onClick={() => withdrawalRequest()} disabled={modal?.balance === 0}>
             Make Cash withdrawal Request
             <Lucide icon="Droplet" className="w-5 h-5 ml-4" />
          </button>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          onClick={() => closeModal()}
          className="btn btn-outline-secondary w-20 mr-1"
        >
          Cancel
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default WalletModal;
