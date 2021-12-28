import React from 'react';
import BorderContainer from '~/app/components/common/BorderContainer';
import noticeIcon from '~/assets/images/notice.svg';
import './notice.css';

export default function Notice() {
  return (
    <BorderContainer className="notice">
      <img src={noticeIcon} alt="noticeIcon" />
      <h5>Notice</h5>
      <p>You have currently: </p>
      <h4>0 CLO</h4>
      <h4>CLO coins are required to cover the transaction fee on Callisto Network.</h4>
      <p>Please consider buying some to complete the operation. </p>
    </BorderContainer>
  );
}
