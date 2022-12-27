import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalFooter, ModalBody } from "@/base-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setAlertModal,
  setLoader,
  setPaymentModal,
} from "../../redux/slices/modalSlice";
import { amountFormat } from "../../utils/format";
import { usePaystackPayment } from "react-paystack";
import { savePurchase } from "../../services/paymentService";
import { fetchCustomerPayments } from "../../redux/slices/paymentSlice";
import { fetchProperty } from "../../redux/slices/propertySlice";

const PaymentModal = () => {
  const [units, setunits] = useState("");

  const user = useSelector((state) => state?.user?.user);

  const modal = useSelector((state) => state.modal?.paymentModal);
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(
      setPaymentModal({
        status: false,
      })
    );
  };



  useEffect(() => {
    dispatch(fetchProperty({id: user?.property}))
  }, []);

  const data = useSelector((state) => state.property);
  const property = data?.property?.data;

  console.log(property);

  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: property?.currentPricePerUnit * units * 100,
    publicKey: "pk_test_0771d7e4094956f3747fad03b45bbc61875d5d59",
  };

  const onClose = () => {
    console.log("closed");
  };

  const onSuccess = (reference) => {
    // console.log(reference);
    completePurchase(reference);
  };

  const initializePayment = usePaystackPayment(config);

  const completePurchase = async (reference) => {
    dispatch(setLoader({ status: true }));

    const paymentPayload = {
      amountPaid: property?.currentPricePerUnit * units,
      purchasedUnit: units,
      price: property?.currentPricePerUnit,
      referenceId: reference?.reference,
      propertyId: user?.property,
      userId: user?._id,
    };

    const res = (await savePurchase(paymentPayload))?.data;
    closeModal();
    dispatch(setLoader({ status: false }));
    dispatch(
      setAlertModal({
        status: true,
        type: res?.status ? "Success" : "Failed",
        message: res.message,
      })
    );
    res?.status && dispatch(fetchCustomerPayments());
  };



  return (
    <Modal show={modal.status} backdrop="static" onHidden={closeModal}>
      <ModalHeader>
        <h2 className="font-medium text-base mr-auto">
          {property?.name} - &#8358;
          {amountFormat(property?.currentPricePerUnit)}/Unit
        </h2>
      </ModalHeader>

      <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
        <div className="col-span-12 sm:col-span-12">
          <label htmlFor="modal-form-1" className="form-label">
            <b>Enter Purchase Unit</b>
          </label>
          <input
            value={units}
            onChange={(e) => setunits(e.target.value)}
            type="number"
            className="form-control"
            placeholder="50"
          />
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
        <button
          type="button"
          disabled={units < 1 || property?.currentPricePerUnit === ""}
          className="btn btn-primary w-20"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default PaymentModal;
