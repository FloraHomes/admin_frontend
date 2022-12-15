import {
  Lucide,
  Alert,
  Tippy,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownContent,
  DropdownItem,
  Litepicker,
  TinySlider,
} from "@/base-components";
import { faker as $f } from "@/utils";
import * as $_ from "lodash";
import classnames from "classnames";
import ReportLineChart from "@/components/report-line-chart/Main";
import ReportPieChart from "@/components/report-pie-chart/Main";
import ReportDonutChart from "@/components/report-donut-chart/Main";
import ReportDonutChart1 from "@/components/report-donut-chart-1/Main";
import SimpleLineChart1 from "@/components/simple-line-chart-1/Main";
import ReportMap from "@/components/report-map/Main";
import { useRef, useState } from "react";
import { DatePicker } from 'react-responsive-datepicker'

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState();
  const importantNotesRef = useRef();
  const prevImportantNotes = () => {
    importantNotesRef.current.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current.tns.goTo("next");
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">

          {/* BEGIN: General Report */}
          <div className="col-span-12 mt-8">
            <div className="col-span-12 intro-y items-center">
             
              <Alert className="box bg-primary text-white flex items-center mb-6">
                {({ dismiss }) => (
                  <>
                    <span>
                      Hello Julian, Thank you for signing up as an Own Earner. Click here to complete your 
                      <a
                        href="https://themeforest.net/item/midone-jquery-tailwindcss-html-admin-template/26366820"
                        className="underline ml-1"
                        target="blank"
                      >
                        Registration
                      </a>
                      .
                    </span>
                    <button
                      type="button"
                      className="btn-close text-white"
                      onClick={dismiss}
                      aria-label="Close"
                    >
                      <Lucide icon="X" className="w-4 h-4" />
                    </button>
                  </>
                )}
              </Alert>
            </div>
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="ShoppingCart"
                        className="report-box__icon text-primary"
                      />
                      
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                    &#8358;350, 000
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Amount Paid
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="CreditCard"
                        className="report-box__icon text-pending"
                      />
                     
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      50 Unit
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Goal
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Monitor"
                        className="report-box__icon text-warning"
                      />
                      
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      5
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Referrals
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="User"
                        className="report-box__icon text-success"
                      />
                     
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                    &#8358;50, 000
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Referral Bonus
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Sales Report
              </h2>
            
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
              </div>
              <div className="report-chart">
                <ReportLineChart height={275} className="mt-6 -mb-6" />
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Sales Report
              </h2>
            
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
              </div>
              <div>
              <ReportPieChart height={215} />
              </div>
              <div className="w-52 sm:w-auto mx-auto mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="truncate">Goal Met</span>
                  <span className="font-medium ml-auto">62% - 34 Units</span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-pending rounded-full mr-3"></div>
                  <span className="truncate">Goal Remainder</span>
                  <span className="font-medium ml-auto">38% - 16 Units</span>
                </div>
               
              </div>
            </div>
          </div>
         
        
 
          {/* BEGIN: Weekly Top Products */}
          <div className="col-span-12 mt-6">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Recent Payment
              </h2>
       
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
              <table className="table table-report sm:mt-2">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap">IMAGES</th>
                    <th className="whitespace-nowrap">PRODUCT NAME</th>
                    <th className="text-center whitespace-nowrap">STOCK</th>
                    <th className="text-center whitespace-nowrap">STATUS</th>
                    <th className="text-center whitespace-nowrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {$_.take($f(), 4).map((faker, fakerKey) => (
                    <tr key={fakerKey} className="intro-x">
                      <td className="w-40">
                        <div className="flex">
                          <div className="w-10 h-10 image-fit zoom-in">
                            <Tippy
                              tag="img"
                              alt="Midone Tailwind HTML Admin Template"
                              className="rounded-full"
                              src={faker.images[0]}
                              content={`Uploaded at ${faker.dates[0]}`}
                            />
                          </div>
                          <div className="w-10 h-10 image-fit zoom-in -ml-5">
                            <Tippy
                              tag="img"
                              alt="Midone Tailwind HTML Admin Template"
                              className="rounded-full"
                              src={faker.images[1]}
                              content={`Uploaded at ${faker.dates[1]}`}
                            />
                          </div>
                          <div className="w-10 h-10 image-fit zoom-in -ml-5">
                            <Tippy
                              tag="img"
                              alt="Midone Tailwind HTML Admin Template"
                              className="rounded-full"
                              src={faker.images[2]}
                              content={`Uploaded at ${faker.dates[2]}`}
                            />
                          </div>
                        </div>
                      </td>
                      <td>
                        <a href="" className="font-medium whitespace-nowrap">
                          {faker.products[0].name}
                        </a>
                        <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                          {faker.products[0].category}
                        </div>
                      </td>
                      <td className="text-center">{faker.stocks[0]}</td>
                      <td className="w-40">
                        <div
                          className={classnames({
                            "flex items-center justify-center": true,
                            "text-success": faker.trueFalse[0],
                            "text-danger": !faker.trueFalse[0],
                          })}
                        >
                          <Lucide icon="CheckSquare" className="w-4 h-4 mr-2" />
                          {faker.trueFalse[0] ? "Active" : "Inactive"}
                        </div>
                      </td>
                      <td className="table-report__action w-56">
                        <div className="flex justify-center items-center">
                          <a className="flex items-center mr-3" href="">
                            <Lucide
                              icon="CheckSquare"
                              className="w-4 h-4 mr-1"
                            />
                            Edit
                          </a>
                          <a className="flex items-center text-danger" href="">
                            <Lucide icon="Trash2" className="w-4 h-4 mr-1" />{" "}
                            Delete
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="intro-y flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-3">
              <nav className="w-full sm:w-auto sm:mr-auto">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <Lucide icon="ChevronsLeft" className="w-4 h-4" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <Lucide icon="ChevronLeft" className="w-4 h-4" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      ...
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <Lucide icon="ChevronRight" className="w-4 h-4" />
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <Lucide icon="ChevronsRight" className="w-4 h-4" />
                    </a>
                  </li>
                </ul>
              </nav>
              <select className="w-20 form-select box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
              </select>
            </div>
          </div>
          {/* END: Weekly Top Products */}
        </div>
      </div>
      <div className="col-span-12 2xl:col-span-3">
        <div className="2xl:border-l -mb-10 pb-10">
          <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
            {/* BEGIN: Transactions */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Latest Referrals
                </h2>
              </div>
              <div className="mt-5">
                {$_.take($f(), 3).map((faker, fakerKey) => (
                  <div key={fakerKey} className="intro-x">
                    <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                      <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                        <img
                          alt="Midone Tailwind HTML Admin Template"
                          src={faker.photos[0]}
                        />
                      </div>
                      <div className="ml-4 mr-auto">
                        <div className="font-medium">{faker.users[0].name}</div>
                        <div className="text-slate-500 text-xs mt-0.5">
                          {faker.dates[0]}
                        </div>
                      </div>
                      <div
                        className={classnames({
                          "text-success": faker.trueFalse[0],
                          "text-danger": !faker.trueFalse[0],
                        })}
                      >
                        {faker.trueFalse[0] ? "+" : "-"}${faker.totals[0]}
                      </div>
                    </div>
                  </div>
                ))}
                <a
                  href=""
                  className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                >
                  View All
                </a>
              </div>
            </div>
            {/* END: Transactions */}
            {/* BEGIN: Recent Activities */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                  Value Progress
                </h2>
              
              </div>
              <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                <div className="intro-x relative flex items-center mb-7">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src="https://cdn-icons-png.flaticon.com/512/7047/7047082.png"
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-5 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">1st Janauary, 2022</div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      1,200,000
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-7">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src="https://cdn-icons-png.flaticon.com/512/7047/7047082.png"
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-5 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">1st Janauary, 2022</div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      1,200,000
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-7">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src="https://cdn-icons-png.flaticon.com/512/7047/7047082.png"
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-5 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">1st Janauary, 2022</div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      1,200,000
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-7">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src="https://cdn-icons-png.flaticon.com/512/7047/7047082.png"
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-5 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">1st Janauary, 2022</div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      1,200,000
                    </div>
                  </div>
                </div>
                <div className="intro-x relative flex items-center mb-7">
                  <div className="before:block before:absolute before:w-20 before:h-px before:bg-slate-200 before:dark:bg-darkmode-400 before:mt-5 before:ml-5">
                    <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                      <img
                        alt="Midone Tailwind HTML Admin Template"
                        src="https://cdn-icons-png.flaticon.com/512/7047/7047082.png"
                      />
                    </div>
                  </div>
                  <div className="box px-5 py-5 ml-4 flex-1 zoom-in">
                    <div className="flex items-center">
                      <div className="font-medium">1st Janauary, 2022</div>
                    </div>
                    <div className="text-slate-500 mt-1">
                      1,200,000
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* END: Recent Activities */}
  
          
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
