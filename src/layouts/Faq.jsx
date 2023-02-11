import { useState } from "react";
import {Lucide} from "@/base-components";
import { useDispatch } from "react-redux";
import { removeFa, updateFa } from "../redux/slices/fileSlice";

const Faq = ({fa}) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [uuid, setUuid] = useState("");
  const [isEdit, setIsEdit] = useState(false);


  const dispatch = useDispatch()
  

  const editFaq = () => {
  
    setQuestion(fa?.question)
    setAnswer(fa?.answer)
    setUuid(fa?.uuid)
    setIsEdit(true)
    
  }

  const updateFaq = (e) => {
    e.preventDefault()
    console.log("cool")
    dispatch(updateFa({uuid, question, answer}))
    setIsEdit(false)  
  }

  const removeFaq = () => {
    console.log(fa?.uuid)
    dispatch(removeFa(fa?.uuid))
  }


  return (
    <>
      {fa?.uuid === uuid  && isEdit ? (
        <form onSubmit={updateFaq}>
          <div className="grid grid-cols-12 gap-2 mt-5">
            <input
              type="text"
              className="form-control col-span-5"
              placeholder="Enter Question"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              className="form-control col-span-5"
              placeholder="Enter Answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <input
              type="submit"
              value="Update"
              className="form-control col-span-2 btn btn-warning"
              placeholder="Input inline 3"
              aria-label="default input inline 3"
            />
          </div>
        </form>
      ) : (
        <div >
          <a className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-darkmode-600 hover:bg-slate-100 dark:hover:bg-darkmode-400 rounded-md">
            <div className="mr-1" style={{ lineHeight: "2.5em" }}>
              <p>
                <span className="text-primary">
                  <b>Question: </b>
                </span>{" "}
                <i> {fa?.question} </i>
              </p>
              <p>
                <span className="text-success">
                  <b>Answer: </b>
                </span>
                <b> {fa?.answer} </b>
              </p>
            </div>

            <div className="ml-auto font-medium" style={{ display: "flex" }}>
              <Lucide
                icon="Edit"
                className="w-4 h-4 text-warning ml-2"
                onClick={editFaq}
              />

              <Lucide icon="Trash" className="w-4 h-4 text-danger ml-2" onClick={removeFaq} />
            </div>
          </a>
        </div>
      )}
    </>
  );
};

export default Faq;
