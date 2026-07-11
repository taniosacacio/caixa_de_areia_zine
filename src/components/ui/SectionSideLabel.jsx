import React from 'react';
import './SectionSideLabel.css';

export const SectionSideLabel = ({ number, title, id }) => {
  return (
    <h2 id={id} className="section-side-label-wrapper">
      <span className="section-label-number">{number}.</span>
      <span className="section-label-text">{title}</span>
    </h2>
  );
};
