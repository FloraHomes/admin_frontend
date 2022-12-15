import DarkModeSwitcher from "@/components/dark-mode-switcher/Main";
import dom from "@left4code/tw-starter/dist/js/dom";
import illustrationUrl from "@/assets/images/illustration.svg";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classnames from "classnames";
import { signin } from "../../services/authService";
import { useFormik } from "formik";
import { signinSchema } from "../../utils/formValidationSchema";
import { LoadingIcon } from "@/base-components";
import { saveUser } from "../../redux/slices/userSlice";
import { setAlertModal } from "../../redux/slices/modalSlice";
import { useDispatch } from "react-redux";


function Main() {
  useEffect(() => {
    dom("body").removeClass("main").removeClass("error-page").addClass("login");
  }, []);

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async(values, {resetForm}) => {
    setIsLoading(true)
    const res = (await signin(values?.email, values?.password))?.data
  console.log(res);
   
    if(res) {
      if(res?.status) {
        dispatch(saveUser(res?.data))
        resetForm()
        navigate("/dashboard")
      }else{
        dispatch(setAlertModal({status: true, type: "Failed!!!", message: res?.message}))
      }
    }else {
      dispatch(setAlertModal({status: true, type:"failed", message: "OOPS, Something went wrong. Please try again"}))
    }

    setIsLoading(false)

  }

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: signinSchema,
    onSubmit,
  });



  return (
    <>
      <div>
        <DarkModeSwitcher />
        <div className="container sm:px-10">
          <div className="block xl:grid grid-cols-2 gap-4">
            {/* BEGIN: Login Info */}
            <div className="hidden xl:flex flex-col min-h-screen">
              <a href="" className="-intro-x flex items-center pt-5">
                <img
                  alt="Florahomes Login"
                  className="w-40"
                  src="https://www.florahomesgc.com/static/media/FHGC%20weblogo.aeab41ed.png"
                />
                {/* <span className="text-white text-lg ml-3"> Icewall </span> */}
              </a>
              <div className="my-auto">
                <img
                  alt="Midone Tailwind HTML Admin Template"
                  className="-intro-x w-1/2 -mt-16"
                  src={illustrationUrl}
                />
                <div className="-intro-x text-white font-medium text-4xl leading-tight mt-10">
                  A few more clicks to <br />
                  sign in to your account.
                </div>
                <div className="-intro-x mt-5 text-lg text-white text-opacity-70 dark:text-slate-400">
                Manage all your operations from your portal.
                </div>
              </div>
            </div>
            {/* END: Login Info */}
            {/* BEGIN: Login Form */}
            <div className="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
              <div className="my-auto mx-auto xl:ml-20 bg-white dark:bg-darkmode-600 xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto">
                <h2 className="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left">
                  Sign In
                </h2>
                <div className="intro-x mt-2 text-slate-400 xl:hidden text-center">
                  A few more clicks to sign in to your account. Manage all your
                  operations from your portal.
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="intro-x mt-8">
                  {errors.email && touched.email && (
                      <div className="text-danger mb-2 mt-3">{errors.email}</div>
                    )}
                    <input
                       value={values.email}
                       onChange={handleChange}
                       id="email"
                       type="email"
                       placeholder="email@example.com"
                       onBlur={handleBlur}
                      className={`intro-x login__input form-control mb-3 py-3 px-4 block ${classnames(
                        {
                          "form-control": true,
                          "border-danger": errors.email,
                        }
                      )}`}
                    />
                   

                   {errors.password && touched.password && (
                      <div className="text-danger mb-2 mt-3">{errors.password}</div>
                    )}
                    <input
                       value={values.password}
                       onChange={handleChange}
                       id="password"
                       type="password"
                       placeholder="email@example.com"
                       onBlur={handleBlur}
                      className={`intro-x login__input form-control py-3 px-4 block ${classnames(
                        {
                          "form-control": true,
                          "border-danger": errors.password,
                        }
                      )}`}
                    />
                   
                  </div>

                  <div className="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4">
                    <a href="">Forgot Password?</a>
                  </div>
                  <div className="intro-x mt-5 xl:mt-8 text-center xl:text-left">
                    <button
                      className="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                      type="submit"
                      disabled={isLoading}
                    >
                      Login {isLoading && <LoadingIcon icon="oval" color="#fff" className="w-4 h-4 ml-3" />}
                    </button>

                    <button
                      className="btn btn-outline-secondary py-3 px-4 w-full xl:w-32 mt-3 xl:mt-0 align-top"
                      type="button"
                      disabled={isLoading}
                      onClick={() => navigate("/register")}
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* END: Login Form */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
