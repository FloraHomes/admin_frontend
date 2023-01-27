import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Lucide,
    Tippy,
  } from "@/base-components";
import { setWalletModal } from '../redux/slices/modalSlice';
import { amountFormat, dateInWord } from '../utils/format';
import TableLoader from '../components/loaders/TableLoader';
import { fetchWithdrawals } from '../redux/slices/withdrawalSlice';

const Withdrawals = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchWithdrawals())
      }, []);
    
      const data = useSelector((state) => state.referrals);
      const data1 = useSelector((state) => state.withdrawals);
      const results = data1?.withdrawals?.data?.data;

      console.log(results);
      
      const referrals = data?.referrals?.data?.data;

      let totalReward = results?.refferalFirstPaymentSum?.length < 1 ? 0 : results?.refferalFirstPaymentSum[0]?.firstPaymentsSum * 0.1
      let propertyShare = results?.refferalFirstPaymentSum?.length < 1 ? 0 : results?.refferalFirstPaymentSum[0]?.firstPaymentsSum * 0.1 * 0.8
      let totalWithdrawal = results?.totalWithrawal?.length < 1 ? 0 : results?.totalWithrawal[0]?.withrawalSum
      let cashWallet = totalReward - (propertyShare + totalWithdrawal)
    
    return (
        <>
        <h2 className="intro-y text-lg font-medium mt-10">Withdrawals</h2>
        <div className="grid grid-cols-12 gap-2 mt-5">

    
            <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="box p-5 mt-1 bg-success intro-x">
                <div className="flex flex-wrap gap-3">
                  <div className="mr-auto">
                    <div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
                      Total Referral Reward
                      <Tippy
                        tag="div"
                        content="This is the total amount you've earned from your referral first payments."
                      >
                        <Lucide icon="AlertCircle" className="w-4 h-4 ml-1.5" />
                      </Tippy>
                    </div>
                    <div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
                    
                    {totalReward > 0 ? `\u20A6${amountFormat(totalReward)}` : "Nil"} 
                    </div>
                  </div>
                  <a
                    className="flex items-center justify-center w-12 h-12"
               
                  >
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="box p-5 mt-1 bg-warning intro-x">
                <div className="flex flex-wrap gap-3">
                  <div className="mr-auto">
                    <div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
                      Property Wallet
                      <Tippy
                        tag="div"
                        content="The amount moved into your goal account (8% of refferal earnings.)"
                      >
                        <Lucide icon="AlertCircle" className="w-4 h-4 ml-1.5" />
                      </Tippy>
                    </div>
                    <div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
                     
                    {propertyShare > 1 ? `\u20A6${amountFormat(propertyShare)}` : "Nil"} 
                    </div>
                  </div>
                  <a
                    className="flex items-center justify-center w-12 h-12"
                  >
            
                  </a>
                </div>
              </div>
            </div>

            <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="box p-5 mt-1 bg-primary intro-x">
                <div className="flex flex-wrap gap-3">
                  <div className="mr-auto">
                    <div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
                      Cash Wallet
                      <Tippy
                        tag="div"
                        content="Amount available for withdrawal in your account"
                      >
                        <Lucide icon="AlertCircle" className="w-4 h-4 ml-1.5" />
                      </Tippy>
                    </div>
                    <div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
                    {cashWallet > 1 ? `\u20A6${amountFormat(cashWallet)}` : "Nil"} 
                    </div>
                  </div>
                  <Tippy
                        tag="div"
                        content="Withrawal Request"
                      >
                  <a
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-darkmode-300 bg-opacity-20 hover:bg-opacity-30 text-white"
                    onClick={() => dispatch(setWalletModal({ status: true, balance: cashWallet }))}
                  >
                    <Lucide icon="Activity" className="w-6 h-6" />
                  </a>
                  </Tippy>
                  <a
                    className="flex items-center justify-center w-12 h-12" >
             
                  </a>
                </div>
              </div>
            </div>


            <div className="col-span-6 sm:col-span-6 xl:col-span-3 intro-y">
              <div className="box p-5 mt-1 bg-danger intro-x">
                <div className="flex flex-wrap gap-3">
                  <div className="mr-auto">
                    <div className="text-white text-opacity-70 dark:text-slate-300 flex items-center leading-3">
                      Total Withrawal
                      <Tippy
                        tag="div"
                        content="The amount you have wihdrawn for your cash wallet"
                      >
                        <Lucide icon="AlertCircle" className="w-4 h-4 ml-1.5" />
                      </Tippy>
                    </div>
                    <div className="text-white relative text-2xl font-medium leading-5 pl-4 mt-3.5">
                 
                    {totalWithdrawal > 1 ? `\u20A6${amountFormat(totalWithdrawal)}` : "Nil"} 
                    </div>
                  </div>
                  <a
                    className="flex items-center justify-center w-12 h-12" >
             
                  </a>
                </div>
              </div>
            </div>

          
       
    
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible mt-5">
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                
                  <th className="whitespace-nowrap" style={{minWidth: "150px"}}>Request Date</th>
                  <th className="whitespace-nowrap">
                    Amount
                  </th>
                  <th className="whitespace-nowrap" style={{minWidth: "150px"}}>Payment Date</th>
                  <th className="whitespace-nowrap">Comment</th>
                </tr>
              </thead>
              <tbody>
                {data?.loading && referrals?.length < 1 ? (
                   <td className="text-center" colSpan="6">
                   <TableLoader/>
                  </td>
                ) : results?.withdrawals?.length > 0 ?  (
                  results?.withdrawals?.map((withdraw) => (
                    <tr key={withdraw?._id} className="intro-x">
                       
                      
                    {/* <td className="text-center">{simpleDateString(pay?.createdAt)}</td> */}
                    <td className="">{dateInWord(withdraw?.createdAt)}</td>
                    <td className="">&#8358;{amountFormat(withdraw?.amount)}</td>
                    <td className="">{dateInWord(withdraw?.paymentDate)}</td>
                    <td className=""><i>{withdraw?.comment}</i></td>
                 
                  
                   
                  </tr>
                   ))
                ): (
                    <td className="text-center text-danger" colSpan="6">
                    No Record Found
                   </td>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
};

export default Withdrawals;