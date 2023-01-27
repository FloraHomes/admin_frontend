import { useEffect, useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@/base-components";
import ReportPieChart from "@/components/report-pie-chart/Main";
import { useDispatch, useSelector } from "react-redux";
import { fetchGoal } from "../redux/slices/goalSlice";
import { amountFormat } from "../utils/format";
import { fetchPaymentSummary } from "../redux/slices/PaymentSummarySlice";
import PriceChangeTable from "../layouts/OwnEarner/PriceChangeTable";

const Goal = () => {
  const [tab, setTab] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGoal());
    dispatch(fetchPaymentSummary());
  }, []);

  const data = useSelector((state) => state.goal);
  const goal = data?.goal?.data?.data[0];
  const paySummary = useSelector(
    (state) => state?.paymentSummary?.paymentSummary?.data?.paySummary[0]
  );

  const goalMetPercent = (paySummary?.purchasedUnits / goal?.goalUnits) * 100;
  const goalRemainderPercent = 100 - goalMetPercent;

  console.log(tab);

  return (
    <>
      <div className="intro-y flex items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Goal</h2>
      </div>
      <TabGroup>
        {/* BEGIN: Profile Info */}
        <div className="intro-y box px-5 pt-5 mt-5">
          <div className="flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5">
            <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
              <div className="w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative">
                <img
                  alt={goal?.property?.name}
                  className="rounded-full"
                  src={goal?.property?.photo}
                />
              </div>
              <div className="ml-5">
                <div className="w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                  {goal?.property?.name}
                </div>
                <div className="text-slate-500">{goal?.property?.area}</div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3 text-success">
                <b>{goal?.property?.name} Summary</b>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                <div className="truncate sm:whitespace-normal flex items-center">
                  <b>Title: &nbsp; &nbsp;</b> {goal?.property?.title}
                </div>

                <div className="truncate sm:whitespace-normal flex items-center mt-4">
                  <b>Current Price: &nbsp; &nbsp;</b> &#8358;
                  {amountFormat(goal?.property?.currentPricePerUnit)}/Unit
                </div>

                <div className="truncate sm:whitespace-normal flex items-center mt-4">
                  <b>Plan Number: &nbsp; &nbsp;</b> LS/D/LA2934
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 flex-1 px-5  border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0">
              <div className="font-medium text-center lg:text-left lg:mt-3 mb-3 text-success">
                <b>Goal Summary</b>
              </div>
              <div className="flex flex-col justify-center items-center lg:items-start mt-4">
                <div className="truncate sm:whitespace-normal flex items-center">
                  <b>Goal Units: &nbsp; &nbsp;</b> {goal?.goalUnits} Units
                </div>

                <div className="truncate sm:whitespace-normal flex items-center mt-4">
                  <b>Purchase Units: &nbsp; &nbsp;</b>{" "}
                  {paySummary?.purchasedUnits} Units
                </div>

                <div className="truncate sm:whitespace-normal flex items-center mt-4">
                  <b>Goal Duration: &nbsp; &nbsp;</b> {goal?.goalDuration}{" "}
                  Months
                </div>
              </div>
            </div>
          </div>
          <TabList className="nav-link-tabs flex-col sm:flex-row justify-center lg:justify-start text-center hidden">
            <Tab fullWidth={false} className="py-4 cursor-pointer">
              Payments
            </Tab>
            <Tab fullWidth={false} className="py-4 cursor-pointer">
              Price Change
            </Tab>
          </TabList>
        </div>
        {/* END: Profile Info */}
        <TabPanels className="intro-y mt-5">
          <TabPanel>
            <div className="grid grid-cols-12 gap-6">
              {/* BEGIN: Top Categories */}
              <TabGroup className="intro-y box col-span-12 lg:col-span-6">
                <div className="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400">
                  {/* <h2 className="font-medium text-base mr-auto">
                     
                    </h2> */}

                  <TabList className="nav-link-tabs w-auto mr-auto">
                  {/* <span onClick={() => setTab(1)}>
                    <Tab
                      fullWidth={false}
                      className="py-5 cursor-pointer"
                     
                    >
                     Recent Payment
                    </Tab>
                    </span>  */}
                    <span  onClick={() => setTab(1)}>
                    <Tab
                      fullWidth={false}
                      className="py-5 cursor-pointer"
                    >
                     Price Change
                    </Tab>
                    </span>
                  </TabList>
                </div>
                {/* {tab === 1 ? <PriceChangeTable /> : <PriceChangeTable />} */}
                {<PriceChangeTable/>}
              </TabGroup>

              <TabGroup className="intro-y box col-span-12 lg:col-span-6">
                <div className="flex items-center px-5 py-5 sm:py-0 border-b border-slate-200/60 dark:border-darkmode-400">
                  <h2 className="font-medium text-base mr-auto py-5">
                    Goal Progress Chart
                  </h2>
                </div>
                <ReportPieChart height={235} />
                <div className="p-5">
                  <div className="w-100 sm:w-auto mx-5 mt-8">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      <span className="truncate">Goal Met</span>
                      <span className="font-medium ml-auto">
                        {goalMetPercent.toFixed(1)}% -{" "}
                        {paySummary?.purchasedUnits} Units
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
              </TabGroup>
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </>
  );
};

export default Goal;
