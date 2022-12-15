import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { back } from "../../redux/slices/ownEarnerSlice";
import { amountFormat } from "../../utils/format";
import { usePaystackPayment } from "react-paystack";
import { uploadFile } from "../../services/sharedService";
import { savePurchase } from "../../services/paymentService";
import { updateUser } from "../../services/authService";
import { saveGoal, saveProperty, saveSignature, saveUser, updatePhoto } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { setAlertModal, setLoader } from "../../redux/slices/modalSlice";
import {recordGoal} from "../../services/goalService";

const FirstPayment = () => {
  const dispatch = useDispatch();
  const goal = useSelector((state) => state?.user?.goal);
  const choosenProperty = useSelector((state) => state?.user?.property);
  const user = useSelector((state) => state?.user?.user);
  const photo = useSelector((state) => state?.user?.photo);
  const signature = useSelector((state) => state?.user?.signature);
  const navigate = useNavigate()


  const config = {
    reference: new Date().getTime().toString(),
    email: user?.email,
    amount: choosenProperty?.currentPrice * goal?.firstPurchase * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const completeFirstPurchase = async (reference) => {
    dispatch(setLoader({status: true}))

  const photoPayload = {
    folderName: "Photos",
    width: 200,
    b64: photo,
  }

  const signaturePayload = {
    folderName: "Signatures",
    width: 250,
    b64: signature,
  }

  const uploadSignature = (await uploadFile((signaturePayload)))?.data;
  const uploadPhoto = (await uploadFile((photoPayload)))?.data;

  const userPayload = {
    _id: user?._id,
    email: user?.email,
    role: "ownEarner",
    firstName: user?.firstName,
    lastName: user?.lastName,
    address: user?.address,
    phone: user?.phone,
    propertyId: choosenProperty?.propertyId,
    photoUrl: uploadPhoto?.data?.secure_url,
    signatureUrl: uploadSignature?.data?.secure_url,
  }

  const paymentPayload = {
    amountPaid: choosenProperty?.currentPrice * goal?.firstPurchase,
    purchasedUnit: goal?.firstPurchase,
    price: choosenProperty?.currentPrice,
    referenceId: reference?.reference,
    propertyId: choosenProperty?.propertyId,
    userId: user?._id,
  }

  const goalPayload = {
    firstPayment: choosenProperty?.currentPrice * goal?.firstPurchase,
    goalUnits: goal?.goalUnits,
    subsequentPurchase: goal?.subsequentPurchase,
    referralId: user?.referralCode,
    property: choosenProperty?.propertyId,
    user: user?._id,
    goalDuration: goal?.goalDuration,
  }


  const logPayment = (await savePurchase(paymentPayload))?.data
  const updatedUser = (await updateUser(userPayload))?.data
  const logGoal = (await recordGoal(goalPayload))?.data


  dispatch(saveGoal({}))
  dispatch(saveProperty({}))
  dispatch(updatePhoto(null))
  dispatch(saveSignature(null))
  dispatch(saveUser(updatedUser?.data))
  dispatch(setLoader({status: false}))

  navigate("/dashboard")

  dispatch(setAlertModal({status: true, type: "Success", message: "Dear Customer, You have successfully onboarded and you are now a full flesh Own-Earner partner with us at Flora homes. We wish you the very best."}))

   
  };

  const onSuccess = (reference) => {
    completeFirstPurchase(reference);
  };

  // you can call this function anything
  const onClose = () => {
    console.log("closed");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div className="box p-5 mt-5 mx-auto ">
      <div className="flex">
        <div className="mr-auto">Property</div>
        <div className="font-medium">{choosenProperty?.propertyName}</div>
      </div>
      <div className="flex mt-4">
        <div className="mr-auto">First Purchase Units</div>
        <div className="font-medium">{goal?.firstPurchase} Units</div>
      </div>
      <div className="flex mt-4">
        <div className="mr-auto">Current Price</div>
        <div className="font-medium text-base">
          &#8358;{amountFormat(choosenProperty?.currentPrice)}
        </div>
      </div>
      <div className="flex mt-4 pt-4 border-t border-slate-200/60 dark:border-darkmode-400">
        <div className="mr-auto font-medium text-base">Amount due Now</div>
        <div className="font-medium text-danger">
          &#8358;
          {amountFormat(choosenProperty?.currentPrice * goal?.firstPurchase)}
        </div>
      </div>

      <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
        <button
          className="btn btn-secondary w-24"
          onClick={() => dispatch(back())}
        >
          Previous
        </button>
        <button
          className="btn btn-success w-30 ml-2"
          onClick={() => {
            initializePayment(onSuccess, onClose);
          }}
        >
          Pay &amp; Submit
        </button>
      </div>
    </div>
  );
};

export default FirstPayment;
