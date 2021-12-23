import React from 'react';
import guidePet from '~/assets/images/guide.svg';
import './guidepet.css';

export default function GuidePet() {
  return (
    <div className="guidepet">
      <img src={guidePet} alt="guidePet" />
    </div>
  );
}
