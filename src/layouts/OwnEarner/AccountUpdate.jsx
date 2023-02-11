import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import profilePlaceholder from "../../assets/images/placeholders/default.png";
import idCard from "../../assets/images/placeholders/id.png";
import { Formik, Field, Form } from "formik";
import { updateProfileSchema } from "../../utils/formValidationSchema";
import { formatImage } from "../../utils/format";
import { updateUser } from "../../services/authService";
import { uploadFile } from "../../services/sharedService";
import { updatesUser } from "../../redux/slices/userSlice";
import { setLoader } from "../../redux/slices/modalSlice";
import { useNavigate } from "react-router-dom";

const AccountUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state?.user?.user);
  // const photo = useSelector((state) => state?.user?.photo);

  const [photo, setPhoto] = useState(profilePlaceholder)
  const [idUpload, setIdUpload] = useState(idCard)

  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    refferalCode: user?.refferalCode,
    address: user?.address,
    dob: "",
    gender: "",
    accountName: "",
    bankName: "",
    accountNo: "",
    permanentAddress: "",
    occupation: "",
    workAddress: "",
    maritalStatus: "",
    nokName: "",
    nokPhone: "",
    nokAddress: "",
    rNok: "",
  };

  const handleSubmit = async(values) => {
   
    if (photo === profilePlaceholder) {
      alert("Please upload your photo");
      return;
    }

    if(idUpload === idCard){
      alert("Please upload your ID Card");
      return
    }

    dispatch(setLoader({status: true}))

  const photoUrl = (await uploadFile(({folderName: "Photos", b64: photo,})))?.data?.data?.secure_url;
  const idUploadUrl = (await uploadFile(({folderName: "IdUploads", b64: idUpload,})))?.data?.data?.secure_url;
  let payload = {...values, photoUrl, idUploadUrl, onboardingLevel: "completed"}

  const updatedUser = (await updateUser(payload))?.data

    dispatch(updatesUser(updatedUser?.data));

    navigate("/dashboard")
    dispatch(setLoader({status: false}))

  };

  const handlePhoto = (imageFile) => {
    formatImage(imageFile[0], async (uri) => {
      // dispatch(updatePhoto(uri));
      setPhoto(uri)
    });
  };

  const handleIdUpload = (imageFile) => {
    formatImage(imageFile[0], async (uri) => {
      // dispatch(updateIdUpload(uri));
      setIdUpload(uri)
    });
  };

  return (
    <div className="px-5 sm:px-20 mt-10 pt-10 border-t border-slate-200/60 dark:border-darkmode-400">
      <div className="p-5">
        <div className="flex flex-col-reverse xl:flex-row flex-col">
          <Formik
            enableReinitialize
            initialValues={initialValues}
            validationSchema={updateProfileSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex-1 mt-6 xl:mt-0">
                  <div className="grid grid-cols-12 gap-x-5">
                    <div className="col-span-12 2xl:col-span-6">
                      <div>
                        <label htmlFor="Name" className="form-label">
                          <b>First Name</b> &nbsp;{" "}
                        </label>
                        {errors.firstName && touched.firstName && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.firstName}
                          </div>
                        )}
                        <Field
                          name="firstName"
                          type="text"
                          className="form-control"
                          readOnly
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="Email" className="form-label">
                          <b>Last Name</b> &nbsp;{" "}
                        </label>
                        {errors.lastName && touched.lastName && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.lastName}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="lastName"
                          readOnly
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="Email" className="form-label">
                          <b>Email</b>
                        </label>
                        {errors.email && touched.email && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.email}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="email"
                          readOnly
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label">
                          <b>Phone Number</b>
                        </label>
                        {errors.phone && touched.phone && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.phone}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="phone"
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="dob" className="form-label">
                          <b>Date of birth</b>
                        </label>
                        {errors.dob && touched.dob && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.dob}
                          </div>
                        )}
                        <Field
                          type="date"
                          className="form-control"
                          name="dob"
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label">
                          <b>Gender</b>
                        </label>
                        {errors.gender && touched.gender && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.gender}
                          </div>
                        )}
                        <Field
                          name="gender"
                          as="select"
                          className="form-control"
                        >
                          <option
                            label="Select an option"
                            value=""
                            selected="true"
                            disabled="disabled"
                          ></option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </Field>
                      </div>

                      <div className="mt-3">
                        <label htmlFor="accountName" className="form-label">
                          <b>Account Name</b>
                        </label>
                        {errors.accountName && touched.accountName && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.accountName}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="accountName"
                          placeholder="i.e Adejare Olaolu"
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label">
                          <b>Bank Name</b>
                        </label>
                        {errors.bankName && touched.bankName && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.bankName}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="bankName"
                          placeholder="i.e Jaiz Bank"
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label">
                          <b>Account Number</b>
                        </label>
                        {errors.accountNo && touched.accountNo && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.accountNo}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          name="accountNo"
                          placeholder="Enter account number"
                        />
                      </div>

                    </div>
                    <div className="col-span-12 2xl:col-span-6">
                      <div className="mt-3 2xl:mt-0">
                        <label
                          htmlFor="update-profile-form-5"
                          className="form-label"
                        >
                          <b>Residential Address</b>{" "}
                        </label>
                        {errors.address && touched.address && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.address}
                          </div>
                        )}
                        <Field
                          // component="textarea"
                          type="text"
                          className="form-control"
                          placeholder="Address"
                          name="address"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-5"
                          className="form-label"
                        >
                          <b>Permanent Address</b>{" "}
                        </label>
                        {errors.permanentAddress && touched.permanentAddress && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.permanentAddress}
                          </div>
                        )}
                        <Field
                          // component="textarea"
                          type="text"
                          className="form-control"
                          placeholder="i.e Family house address"
                          name="permanentAddress"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-5"
                          className="form-label"
                        >
                          <b>Occupation</b>{" "}
                        </label>
                        {errors.occupation && touched.occupation && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.occupation}
                          </div>
                        )}
                        <Field
                          // component="textarea"
                          type="text"
                          className="form-control"
                          placeholder="What do you do"
                          name="occupation"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-5"
                          className="form-label"
                        >
                          <b>Work Address</b>{" "}
                        </label>
                        {errors.workAddress && touched.workAddress && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.workAddress}
                          </div>
                        )}
                        <Field
                          // component="textarea"
                          type="text"
                          className="form-control"
                          placeholder="Place of work address"
                          name="workAddress"
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="phone" className="form-label">
                          <b>Marital Status</b>
                        </label>
                        {errors.maritalStatus && touched.maritalStatus && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.maritalStatus}
                          </div>
                        )}
                        <Field
                          name="maritalStatus"
                          as="select"
                          className="form-control"
                        >
                          <option
                            label="Select an option"
                            value=""
                            selected="true"
                            disabled="disabled"
                          ></option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </Field>
                      </div>

                      <div className="mt-3">
                        <label
                          className="form-label"
                        >
                          <b>Next of kin name</b>{" "}
                        </label>
                        {errors.nokName && touched.nokName && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.nokName}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="name of next of kin"
                          name="nokName"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          className="form-label"
                        >
                          <b>Next of kin Phone Number</b>{" "}
                        </label>
                        {errors.nokPhone && touched.nokPhone && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.nokPhone}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="phone number of next of kin"
                          name="nokPhone"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          className="form-label"
                        >
                          <b>Next of kin address</b>{" "}
                        </label>
                        {errors.nokAddress && touched.nokAddress && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.nokAddress}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Address of next of kin"
                          name="nokAddress"
                        />
                      </div>

                      <div className="mt-3">
                        <label
                          className="form-label"
                        >
                          <b>Relationship with next of kin</b>{" "}
                        </label>
                        {errors.rNok && touched.rNok && (
                          <div className="text-danger mb-2 mt-3">
                            {errors.rNok}
                          </div>
                        )}
                        <Field
                          type="text"
                          className="form-control"
                          placeholder="Relationship with next of kin"
                          name="rNok"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success text-white w-50 mt-3"
                  >
                    Complete Onboarding
                  </button>
                </div>
              </Form>
            )}
          </Formik>
          <div className="w-52 mx-auto xl:mr-0 xl:ml-6">
            <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
              <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                <img
                  className="rounded-md"
                  alt={user?.name}
                  src={photo}
                />
              </div>
              <div className="mx-auto cursor-pointer relative mt-5">
                <button type="button" className="btn btn-warning w-full">
                  {photo !== profilePlaceholder ? "Change Photo" : "Upload Photo"}
                </button>
                <input
                  type="file"
                  className="w-full h-full top-0 left-0 absolute opacity-0"
                  onChange={(e) => handlePhoto(e.target.files)}
                  accept="image/jpeg, image/png"
                />
              </div>
            </div>

            <div className="border-2 border-dashed shadow-sm border-slate-200/60 dark:border-darkmode-400 rounded-md p-5 mt-3">
              <div className="h-40 relative image-fit cursor-pointer zoom-in mx-auto">
                <img
                  className="rounded-md"
                  alt={user?.name}
                  src={idUpload}
                />
              </div>
              <div className="mx-auto cursor-pointer relative mt-5">
                <button type="button" className="btn btn-primary w-full">
                  {idUpload !== idCard ? "Change ID Card" : "Upload ID Card"}
                </button>
                <input
                  type="file"
                  className="w-full h-full top-0 left-0 absolute opacity-0"
                  onChange={(e) => handleIdUpload(e.target.files)}
                  accept="image/jpeg, image/png"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountUpdate;
