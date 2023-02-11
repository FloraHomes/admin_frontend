import { combineReducers } from 'redux';
import userSlice from './userSlice';
import modalSlice from './modalSlice';
import ownEarnerSlice from './ownEarnerSlice';
import paymentSlice from './paymentSlice';
import goalSlice from './goalSlice';
import referralSlice from './referralSlice';
import propertySlice from './propertySlice';
import PaymentSummarySlice from './PaymentSummarySlice';
import referralSummarySlice from './referralSummarySlice';
import withdrawalSlice from './withdrawalSlice';
import editorSlice from './editorSlice';
import fileSlice from './fileSlice';




const combinedSlices = combineReducers({
    user: userSlice,
    modal: modalSlice,
    ownEarner: ownEarnerSlice,
    payments: paymentSlice,
    goal: goalSlice,
    referrals: referralSlice,
    property: propertySlice,
    paymentSummary: PaymentSummarySlice,
    referralSummary: referralSummarySlice,
    withdrawals: withdrawalSlice,
    editor: editorSlice,
    file: fileSlice
  
  
});

export default combinedSlices;
