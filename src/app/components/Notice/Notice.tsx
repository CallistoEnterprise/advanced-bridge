import React from 'react';
import BorderContainer from '~/app/components/common/BorderContainer';
import noticeIcon from '~/assets/images/notice.svg';
import './notice.css';

export default function Notice() {
  return (
    <BorderContainer className="notice">
      <img src={noticeIcon} alt="noticeIcon" />
      <div>
        <div className="notice__values">
          <h5>Notice</h5>
          <p>You have currently: </p>
          <h4>0 CLO</h4>
        </div>
        <div className="notice__description">
          <h4>CLO coins are required to cover the transaction fee on Callisto Network.</h4>
          <p>Please consider buying some to complete the operation. </p>
        </div>
      </div>
    </BorderContainer>
  );
}
