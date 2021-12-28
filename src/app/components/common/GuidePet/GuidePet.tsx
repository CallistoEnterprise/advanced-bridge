import React from 'react';
import guidePet from '~/assets/images/guide.svg';
import CustomButton from '../CustomButton';
import './guidepet.css';

export default function GuidePet() {
  return (
    <div className="guidepet">
      <img src={guidePet} alt="guidePet" />
      <div>
        <CustomButton className="guidepet__videoguide">Video Guide</CustomButton>
      </div>
    </div>
  );
}
