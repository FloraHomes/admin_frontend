import { useEffect } from "react";
import { Lucide, } from "@/base-components";
import ReportPieChart from "@/components/report-pie-chart/Main";
import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRefferalLinkModal } from "../../redux/slices/modalSlice";
import { fetchPaymentSummary } from "../../redux/slices/PaymentSummarySlice";
import { amountFormat, dateInWord, simpleDateString } from "../../utils/format";
import { fetchGoal } from "../../redux/slices/goalSlice";
import { fetchReferralSummary } from "../../redux/slices/referralSummarySlice";
import { useNavigate } from "react-router-dom";
import PaymentTable from "../../layouts/OwnEarner/PaymentTable";
import { priceChanges2 } from "../../mock/priceChanges";
import profilePlaceholder from "../../assets/images/placeholders/default.png";


const OwnEarnerDashboard = () => {
  const dispatch = useDispatch();
  const paySummaryData = useSelector(
    (state) => state?.paymentSummary?.paymentSummary?.data
  );
  const goal = useSelector((state) => state.goal?.goal?.data?.data[0]);
  const referralSummary = useSelector(
    (state) => state?.referralSummary?.referralSummary?.data
  );

  console.log(referralSummary);

  const paySummary = paySummaryData?.paySummary[0];

  const goalMetPercent = (paySummary?.purchasedUnits / goal?.goalUnits) * 100;
  const goalRemainderPercent = 100 - goalMetPercent;

  const [salesReportFilter, setSalesReportFilter] = useState();
  const importantNotesRef = useRef();
  const prevImportantNotes = () => {
    importantNotesRef.current.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current.tns.goTo("next");
  };

  useEffect(() => {
    dispatch(fetchPaymentSummary());
    dispatch(fetchGoal());
    dispatch(fetchReferralSummary());
  }, []);

  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-12 2xl:col-span-9">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 mt-8">
         
            <div className="grid grid-cols-12 gap-6 mt-5">
              <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="CreditCard"
                        className="report-box__icon text-primary"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      &#8358;{amountFormat(paySummary?.amount)}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Total Paid
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Monitor"
                        className="report-box__icon text-pending"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {goal?.goalUnits} Units
                    </div>
                    <div className="text-base text-slate-500 mt-1">Goal</div>
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="ShoppingBag"
                        className="report-box__icon text-warning"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {paySummary?.purchasedUnits} Units
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Goal Met
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
                <div className="report-box zoom-in">
                  <div className="box p-5">
                    <div className="flex">
                      <Lucide
                        icon="Users"
                        className="report-box__icon text-success"
                      />
                    </div>
                    <div className="text-3xl font-medium leading-8 mt-6">
                      {referralSummary?.referralCount[0]?.noOfReferrals > 0
                        ? referralSummary?.referralCount[0]?.noOfReferrals
                        : "No"}
                    </div>
                    <div className="text-base text-slate-500 mt-1">
                      Referrals
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Goal Progress Chart
              </h2>
            </div>
            <div className="intro-y box p-5 mt-12 sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center"></div>
              <div>
                <ReportPieChart height={215} />
              </div>
              <div className="w-100 sm:w-auto mx-5 mt-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                  <span className="truncate">Goal Met</span>
                  <span className="font-medium ml-auto">
                    {goalMetPercent.toFixed(1)}% - {paySummary?.purchasedUnits}{" "}
                    Units
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 bg-success rounded-full mr-3"></div>
                  <span className="truncate">Goal Remainder</span>
                  <span className="font-medium ml-auto">
                    {goalRemainderPercent.toFixed(1)}% -{" "}
                    {goal?.goalUnits - paySummary?.purchasedUnits} Units
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6 mt-8">
            <div className="intro-y block sm:flex items-center h-10">
              <h2 className="text-lg font-medium truncate mr-5">
                Recent Payments
              </h2>
            </div>
            <div className="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
              <PaymentTable />
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 2xl:col-span-3">
        <div className="2xl:border-l -mb-10 pb-10">
          <div className="2xl:pl-6 grid grid-cols-12 gap-x-6 2xl:gap-x-0 gap-y-6">
            {/* BEGIN: Transactions */}

            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3 2xl:mt-8">
              {referralSummary?.referrals?.length < 1 ? (
                <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                  <div className="intro-y box p-5 bg-primary text-white mt-5">
                    <div className="flex items-center">
                      <div className="font-medium text-lg">
                        Important Update
                      </div>
                    </div>
                    <div className="mt-4" style={{ lineHeight: 2 }}>
                      Enjoy the full benefit of being an Own-Earner by referring
                      others to partner with us. You will earn 10% of each of
                      your referrals. Click on the copy link button to generate
                      your link and share.
                    </div>
                    <div className="font-medium flex mt-5">
                      <button
                        type="button"
                        onClick={() =>
                          dispatch(setRefferalLinkModal({ status: true }))
                        }
                        className="btn py-1 px-2 border-white text-white dark:text-slate-300 dark:bg-darkmode-400 dark:border-darkmode-400"
                      >
                        Get Link
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="intro-x flex items-center h-10">
                    <h2 className="text-lg font-medium truncate mr-5">
                      Latest Referrals
                    </h2>
                  </div>

                  <div className="mt-5">
                    {referralSummary?.referrals?.map((referral) => (
                      <div key={referral?._id} className="intro-x">
                        <div className="box px-5 py-3 mb-3 flex items-center zoom-in">
                          <div className="w-10 h-10 flex-none image-fit rounded-full overflow-hidden">
                            <img
                              alt={referral?.user?.firstName}
                              src={referral?.user?.photoUrl || profilePlaceholder}
                            />
                          </div>
                          <div className="ml-4 mr-auto">
                            <div className="font-medium">
                              {referral?.user?.firstName}{" "}
                              {referral?.user?.lastName}
                            </div>
                            <div className="text-slate-500 text-xs mt-0.5">
                              {simpleDateString(referral?.createdAt)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <a
                      onClick={() => navigate("/referrals")}
                      style={{ cursor: "pointer" }}
                      className="intro-x w-full block text-center rounded-md py-3 border border-dotted border-slate-400 dark:border-darkmode-300 text-slate-500"
                    >
                      View All
                    </a>
                  </div>
                </>
              )}
            </div>
            {/* END: Transactions */}
            {/* BEGIN: Recent Activities */}
            <div className="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 mt-3">
              <div className="intro-x flex items-center h-10">
                <h2 className="text-lg font-medium truncate mr-5">
                {goal?.property?.name} Recent Price
                </h2>
              </div>
              <div className="mt-5 relative before:block before:absolute before:w-px before:h-[85%] before:bg-slate-200 before:dark:bg-darkmode-400 before:ml-5 before:mt-5">
                {priceChanges2?.map((price) => (
                  <div
                    className="intro-x relative flex items-center mb-7"
                    key={price?.date}
                  >
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
                        <div className="font-medium">
                          {dateInWord(price?.date)}
                        </div>
                      </div>
                      <div className="text-slate-500 mt-1">
                        &#8358;{amountFormat(price.price)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* END: Recent Activities */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnEarnerDashboard;
