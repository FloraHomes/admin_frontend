import {
  Lucide,
  Modal,
  ModalHeader,
  ModalFooter,
  ModalBody,
} from "@/base-components";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { back, next, updateOwnEarnerProperties } from "../../redux/slices/ownEarnerSlice";

import { propertyData } from "../../mock/propertyData";
import { amountFormat } from "../../utils/format";
import { Field, Form, Formik } from "formik";
import { goalSchema } from "../../utils/formValidationSchema";
import { saveGoal, saveProperty } from "../../redux/slices/userSlice";
import { ownEarnerProperties } from "../../services/propertyService";



const CreateGoal = () => {
  const [goalModal, setGoalModal] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [propertyName, setPropertyName] = useState("")
  const [currentPrice, setCurrentPrice] = useState("")
  

  const dispatch = useDispatch();
  const goal = useSelector((state) => state?.user?.goal);
  const choosenPropery = useSelector((state) => state?.user?.property);

  // console.log(choosenPropery);

  const initialValues = {
    goalUnits: goal?.goalUnits,
    goalDuration: goal?.goalDuration,
    firstPurchase: goal?.firstPurchase,
    subsequentPurchase: goal?.subsequentPurchase,
  };

  const handleSubmit = (values) => {
    dispatch(saveGoal(values))
    dispatch(saveProperty({
      propertyName,
      propertyId,
      currentPrice
    }))
    setGoalModal(false)
  
  };

  const fetchOwnEarnerPropertes = async() => {
    const res = (await ownEarnerProperties())?.data?.data
    dispatch(updateOwnEarnerProperties(res))  
  }

  useEffect(() => { 
    fetchOwnEarnerPropertes()
  }, [])
  

  const properties = useSelector((state) => state?.ownEarner?.properties);

  return (
    <>
      <div className="px-5 sm:px-20 mt-10 pt-10 grid grid-cols-12 gap-6 mt-5">
        {/* BEGIN: Users Layout */}
        {properties.map((property) => (
          <div
            key={property?._id}
            className="intro-y col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4"
          >
            <div className="box" style={{ backgroundColor: choosenPropery?.propertyId == property?._id ? "#f59e0b" : "#ccc" }}>
              <div className="p-5">
                <div className="h-40 2xl:h-56 image-fit rounded-md overflow-hidden before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-black before:to-black/10">
                  <img
                    alt={property?.name}
                    className="rounded-md"
                    src={property?.photo}
                  />

                  <div className="absolute bottom-0 text-white px-5 pb-6 z-10">
                    <a href="" className="block font-medium text-base">
                      {property?.name}
                    </a>
                    <span className="text-white/90 text-xs mt-3">
                      {property?.area}
                    </span>
                  </div>
                </div>
                <div className="text-slate-600 dark:text-slate-500 mt-5">
                  <div className="flex items-center">
                    <Lucide icon="Link" className="w-4 h-4 mr-2" />
                    Current Price: &#8358;
                    {amountFormat(property?.currentPricePerUnit)}/Unit
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="Layers" className="w-4 h-4 mr-2" />
                    Title:
                    {property?.title}
                  </div>
                  <div className="flex items-center mt-2">
                    <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" /> Area:
                    {property?.area}
                  </div>
                </div>
              </div>
              <div className="flex justify-center lg:justify-start items-center p-5 border-t border-slate-200/60 dark:border-darkmode-400">
                <button
                  type="button"
                  onClick={() => {
                    setGoalModal(true);
                    setPropertyName(property?.name)
                    setPropertyId(property?._id)
                    setCurrentPrice(property?.currentPricePerUnit)
                  }}
                  className="btn btn-danger w-20 mt-3"
                >
                  Select
                </button>

                {/* <a
                    className="flex items-center text-danger"
                    href="#"
                    onClick={() => {
                      setDeleteConfirmationModal(true);
                    }}
                  >
                    <Lucide icon="Trash2" className="w-4 h-4 mr-1" /> Delete
                  </a> */}
              </div>
            </div>
          </div>
        ))}
        {/* END: Users Layout */}
        <div className="intro-y col-span-12 flex items-center justify-center sm:justify-end mt-5">
          <button
            className="btn btn-secondary w-24"
            onClick={() => dispatch(back())}

          >
            Previous
          </button>
          <button
            className="btn btn-success w-24 ml-2"
            disabled={choosenPropery?.propertyId?.length > 0 ? false : true}
            onClick={() => dispatch(next())}
          >
            Next
          </button>
        </div>
      </div>
     
      <Modal
        show={goalModal}
        backdrop="static"
        onHidden={() => {
          setGoalModal(false);
        }}
      >
        <ModalHeader>
          <h2 className="font-medium text-base mr-auto">{propertyName} - {currentPrice}/Unit</h2>
        </ModalHeader>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={goalSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ errors, touched }) => (
            <Form>
              <ModalBody className="grid grid-cols-12 gap-4 gap-y-3">
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="modal-form-1" className="form-label">
                    <b>Enter Goal Units</b> &nbsp;{" "}
                    <i>
                      <small>(1sqm is 1 Unit)</small>
                    </i>
                  </label>
                  {errors.goalUnits && touched.goalUnits && (
                    <div className="text-danger mb-2 mt-3">
                      {errors.goalUnits}
                    </div>
                  )}
                  <Field
                    type="number"
                    className="form-control"
                    placeholder="1000"
                    name="goalUnits"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="modal-form-2" className="form-label">
                    <b>Goal Duration (months)</b>
                  </label>
                  {errors.goalDuration && touched.goalDuration && (
                    <div className="text-danger mb-2 mt-3">
                      {errors.goalDuration}
                    </div>
                  )}
                  <Field
                    name="goalDuration"
                    type="number"
                    className="form-control"
                    placeholder="12"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="modal-form-3" className="form-label">
                    <b>First Purchase Units</b>
                  </label>
                  {errors.firstPurchase && touched.firstPurchase && (
                    <div className="text-danger mb-2 mt-3">
                      {errors.firstPurchase}
                    </div>
                  )}
                  <Field
                    name="firstPurchase"
                    type="number"
                    className="form-control"
                    placeholder="50"
                  />
                </div>
                <div className="col-span-12 sm:col-span-6">
                  <label htmlFor="modal-form-6" className="form-label">
                    <b>Subsequent Purchase Units</b>
                    {errors.subsequentPurchase &&
                      touched.subsequentPurchase && (
                        <div className="text-danger mb-2 mt-3">
                          {errors.subsequentPurchase}
                        </div>
                      )}
                  </label>
                  <Field
                    name="subsequentPurchase"
                    type="number"
                    className="form-control"
                    placeholder="30"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <button
                  type="button"
                  onClick={() => {
                    setGoalModal(false);
                  }}
                  className="btn btn-outline-secondary w-20 mr-1"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary w-20">
                  Continue
                </button>
              </ModalFooter>
            </Form>
          )}
        </Formik>
      </Modal>
    
    </>
  );
};

export default CreateGoal;
