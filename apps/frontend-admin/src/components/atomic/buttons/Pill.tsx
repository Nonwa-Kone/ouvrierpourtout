import React from 'react';

type pill_types = {
  label: string;
  onSelected: () => void;
  selected: boolean;
};

export const Pill: React.FC<pill_types> = ({ label, selected, onSelected }) => {
  return (
    <button
      className={`pill ${selected ? 'pill--selected' : ''}`}
      onClick={onSelected}
    >
      {label}
    </button>
  );
};
