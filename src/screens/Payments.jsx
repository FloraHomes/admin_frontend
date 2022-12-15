import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerPayments } from "../redux/slices/paymentSlice";
import { amountFormat, simpleDateString } from "../utils/format";
import { setPaymentModal } from "../redux/slices/modalSlice";
import LoadingIcon from "../views/loading-icon/Main";
import TableLoader from "../components/loaders/TableLoader";

const Payments = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCustomerPayments());
  }, []);

  const data = useSelector((state) => state.payments);

  const payments = data?.payments?.data?.data;
  // console.log(payments);

  return (
    <>
      <h2 className="intro-y text-lg font-medium mt-10">Payments</h2>
      <div className="grid grid-cols-12 gap-6 mt-5">
        <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
          <button
            className="btn btn-primary shadow-md mr-2"
            onClick={() => dispatch(setPaymentModal({ status: true }))}
          >
            Make New Payment
          </button>
        </div>
        {/* BEGIN: Data List -*/}
        <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
          <table className="table table-report -mt-2">
            <thead>
              <tr>
                <th className="text-center whitespace-nowrap">Date</th>
                <th className="text-center whitespace-nowrap">Unit Price</th>
                <th className="text-center whitespace-nowrap">
                  Purchased Unit
                </th>
                <th className="text-center whitespace-nowrap">Amount Paid</th>
                <th className="text-center whitespace-nowrap">Property Name</th>
                <th className="text-center whitespace-nowrap">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data?.loading && payments?.length < 1 ? (
                 <td className="text-center" colSpan="6">
                 <TableLoader/>
                </td>
              ) : (
                payments?.map((pay) => (
                  <tr key={pay?._id} className="intro-x">
                     
                    
                  <td className="text-center">{simpleDateString(pay?.createdAt)}</td>
                  <td className="text-center">&#8358;{amountFormat(pay?.price)}</td>
                  <td className="text-center">{amountFormat(pay?.purchasedUnit)}</td>
                  <td className="text-center">&#8358;{amountFormat(pay?.amountPaid)}</td>
                  <td className="text-center">{pay?.property?.name}</td>
                  <td className="text-center"></td>
                 
                </tr>
                 ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Payments;
