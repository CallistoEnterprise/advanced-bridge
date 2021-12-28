import React from 'react';
import claimpet from '~/assets/images/claimpet.png';
import CustomButton from '../CustomButton';
import './claimpet.css';

export default function ClaimPet() {
  return (
    <div className="claimpet">
      <img src={claimpet} alt="claimpet" />
      <div>
        <CustomButton className="claimpet__videoguide">Claim a Transaction</CustomButton>
      </div>
    </div>
  );
}
