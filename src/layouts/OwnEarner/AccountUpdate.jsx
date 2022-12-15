import { useDispatch, useSelector } from "react-redux";
import { next } from "../../redux/slices/ownEarnerSlice";
import profilePlaceholder from "../../assets/images/placeholders/default.png";
import { Formik, Field, Form } from "formik";
import { updateProfileSchema } from "../../utils/formValidationSchema";
import { formatImage } from "../../utils/format";
import { updatePhoto, updateUser } from "../../redux/slices/userSlice";

const AccountUpdate = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const photo = useSelector((state) => state?.user?.photo);



  const initialValues = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    phone: user?.phone,
    refferalCode: user?.refferalCode,
    address: user?.address,
  };

  const handleSubmit =  (values) => {
    if(photo === null){
        alert("Please upload your photo")
        return
    }
    dispatch(updateUser(values))
    dispatch(next())
   
  };

  const handlePhoto = (imageFile) => {
  
    formatImage(imageFile[0], async (uri) => {
        dispatch(updatePhoto(uri))
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
                          <i>
                            <small>
                              (As you want it to appear on documents)
                            </small>
                          </i>
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
                        />
                      </div>

                      <div className="mt-3">
                        <label htmlFor="Email" className="form-label">
                          <b>Last Name</b> &nbsp;{" "}
                          <i>
                            <small>
                              (As you want it to appear on documents)
                            </small>
                          </i>
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

                    </div>
                    <div className="col-span-12 2xl:col-span-6">

                    <div className="mt-3 2xl:mt-0">
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
                    </div>
                    <div className="col-span-12">
                      <div className="mt-3">
                        <label
                          htmlFor="update-profile-form-5"
                          className="form-label"
                        >
                          <b>Address</b>{" "} <small><i>(Optional)</i></small>
                        </label>
                        <Field
                          component="textarea"
                          className="form-control"
                          placeholder="Adress"
                          name="address"
                        />
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-success w-20 mt-3">
                    Next
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
                  src={photo ? photo : profilePlaceholder}
                />
              </div>
              <div className="mx-auto cursor-pointer relative mt-5">
                      <button type="button" className="btn btn-warning w-full">
                        {photo ? "Change Photo" : "Upload Photo"}
                      </button>
                      <input
                        type="file"
                        className="w-full h-full top-0 left-0 absolute opacity-0"
                        onChange={(e)=>handlePhoto(e.target.files)}
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
