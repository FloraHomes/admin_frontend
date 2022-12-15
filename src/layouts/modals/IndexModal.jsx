import React from 'react';
import FullPageLoader from '../../components/loaders/FullPageLoader.jsx';
import AlertModal from './AlertModal.jsx';
import RefferalLinkModal from './RefferalLinkModal.jsx';
import PaymentModal from './PaymentModal.jsx';
import "../../assets/css/components/modal.css"

const IndexModal = () => {
    return (
        <>
           <AlertModal/> 
           <FullPageLoader/>
           <RefferalLinkModal/>
           <PaymentModal/>
        </>
    );
};

export default IndexModal;