import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Lucide,
    Tippy,
  } from "@/base-components";
import { setRefferalLinkModal } from '../redux/slices/modalSlice';
import { fetchReferrals } from '../redux/slices/referralSlice';
import { amountFormat, simpleDateString } from '../utils/format';
import TableLoader from '../components/loaders/TableLoader';

const Referrals = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchReferrals());
      }, []);
    
      const data = useSelector((state) => state.referrals);
      
      const referrals = data?.referrals?.data?.data;
    
    return (
        <>
        <h2 className="intro-y text-lg font-medium mt-10">Referrals</h2>
        <div className="grid grid-cols-12 gap-2 mt-5">
       
          <div className="intro-y col-span-12 flex flex-wrap sm:flex-nowrap items-center mt-2">
            <button
              className="btn btn-success text-white shadow-md mr-2"
              onClick={() => dispatch(setRefferalLinkModal({status: true}))}
            >
              Copy Referral Link
            </button>
          </div>
    
          <div className="intro-y col-span-12 overflow-auto lg:overflow-visible">
            <table className="table table-report -mt-2">
              <thead>
                <tr>
                  {/* <th className="text-center whitespace-nowrap">Date</th> */}
                  <th className="whitespace-nowrap">Photo</th>
                  <th className="whitespace-nowrap">
                    Name
                  </th>
                  <th className="whitespace-nowrap">First Purchase</th>
                  <th className="whitespace-nowrap">Referral Bonus</th>
                </tr>
              </thead>
              <tbody>
                {data?.loading && referrals?.length < 1 ? (
                   <td className="text-center" colSpan="6">
                   <TableLoader/>
                  </td>
                ) : referrals?.length > 0 ?  (
                  referrals?.map((referral) => (
                    <tr key={referral?._id} className="intro-x">
                       
                      
                    {/* <td className="text-center">{simpleDateString(pay?.createdAt)}</td> */}
                    <td className="w-40">
                    <div className="flex">
                      <div className="w-10 h-10 image-fit zoom-in">
                        <Tippy
                          tag="img"
                          alt="Midone Tailwind HTML Admin Template"
                          className="rounded-full"
                          src={referral?.user?.photoUrl}
                          content={`Created on ${simpleDateString(referral?.user?.createdAt)}`}
                        />
                      </div>
                     
                    </div>
                  </td>
                    <td className="">{referral?.user?.firstName} {referral?.user?.lastName}</td>
                    <td className="">&#8358;{amountFormat(referral?.firstPayment)}</td>
                    <td className="">&#8358;{amountFormat(referral?.firstPayment / 10)}</td>
                  
                   
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

export default Referrals;