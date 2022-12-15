import { useSelector } from "react-redux";
import { amountFormat, simpleDateString } from "../../utils/format";

const PaymentTable = () => {
  const recentPayments = useSelector(
    (state) => state?.paymentSummary?.paymentSummary?.data?.payments
  );
  return (
    <table className="table table-report sm:mt-2">
      <thead>
        <tr>
          <th className="whitespace-nowrap text-primary">Amount Paid</th>
          <th className="text-center whitespace-nowrap text-success">
            Property
          </th>
        </tr>
      </thead>
      <tbody>
        {recentPayments?.map((payment) => (
          <tr key={payment?._id} className="intro-x">
            <td>
              <a href="" className="font-medium whitespace-nowrap">
              &#8358;{amountFormat(payment?.amountPaid)}
              </a>
              <div className="text-slate-500 text-xs whitespace-nowrap mt-0.5">
                {simpleDateString(payment?.createdAt)}
              </div>
            </td>
            <td className="text-center">{payment?.property?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PaymentTable;
