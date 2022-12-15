import React from 'react';
import { useSelector } from 'react-redux';
import AccountUpdate from '../layouts/OwnEarner/AccountUpdate';
import CreateGoal from '../layouts/OwnEarner/CreateGoal';
import {Lucide, Alert} from "@/base-components"
import TAndC from '../layouts/OwnEarner/TAndC';
import FirstPayment from '../layouts/OwnEarner/FirstPayment';

const OwnEarnerSetup = () => {
    const step = useSelector((state) => state?.ownEarner?.step);
    const user = useSelector((state) => state?.user?.user);

    
  

    return (
        <>
        <div className="flex items-center mt-8">
        <Alert className="box bg-danger text-white flex items-center mb-6">
                  {({ dismiss }) => (
                    <>
                      <span>
                        Hello {user?.name}, Thank you for signing up as an Own Earner. Kindly complete your registration in few steps to validate our patnership.
                      </span>
                     
                    </>
                  )}
                </Alert>
        </div>
        {/* BEGIN: Wizard Layout */}
        <div className="intro-y box py-10 sm:py-20 mt-5">
          <div className="relative before:hidden before:lg:block before:absolute before:w-[69%] before:h-[3px] before:top-0 before:bottom-0 before:mt-4 before:bg-slate-100 before:dark:bg-darkmode-400 flex flex-col lg:flex-row justify-center px-5 sm:px-20">
            <div className="intro-x lg:text-center flex items-center lg:block flex-1 z-10">
              <button className="w-10 h-10 rounded-full btn btn-primary">
              {step > 1 ? <Lucide icon="Check" className="w-10 h-10" /> : 1}
              </button>
              <div className="lg:w-32 font-medium text-base lg:mt-3 ml-3 lg:mx-auto">
                Update Profile
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
              <button className={step >=2 ? "w-10 h-10 rounded-full btn btn-primary" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"}>
              {step > 2 ? <Lucide icon="Check" className="w-10 h-10" /> : 2}
              </button>
              <div className="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                Create a goal
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
            <button className={step >=3 ? "w-10 h-10 rounded-full btn btn-primary" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"}>
            {step > 3 ? <Lucide icon="Check" className="w-10 h-10" /> : 3}
              </button>
              <div className="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                T &amp; C
              </div>
            </div>
            <div className="intro-x lg:text-center flex items-center mt-5 lg:mt-0 lg:block flex-1 z-10">
            <button className={step === 4 ? "w-10 h-10 rounded-full btn btn-primary" : "w-10 h-10 rounded-full btn text-slate-500 bg-slate-100 dark:bg-darkmode-400 dark:border-darkmode-400"}>
                4
              </button>
              <div className="lg:w-32 text-base lg:mt-3 ml-3 lg:mx-auto text-slate-600 dark:text-slate-400">
                Payment
              </div>
            </div>
          </div>
          {step === 1 ? <AccountUpdate/> : step === 2 ? <CreateGoal/> : step === 3 ? <TAndC/> : <FirstPayment/>}
          
            
        </div>
      
        {/* END: Wizard Layout */}
      </>
    );
};

export default OwnEarnerSetup;