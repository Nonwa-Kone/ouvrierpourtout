import { CheckIcon } from 'lucide-react';
import React from 'react';
import { colors } from '../../../assets/constants/colors';
import { tCheckboxBtn } from '../../../types/buttons';

export const Checkbox: React.FC<tCheckboxBtn> = ({
  active,
  label,
  onCheck,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={onCheck}
      className={`checkbox checkbox--light`}
    >
      <span
        className={`checkbox--check checkbox--check--light`}
        style={{
          borderColor: active ? colors.primary[500] : colors.dark[500],
        }}
      >
        {active && <CheckIcon />}
      </span>
      <span
        style={{ color: active ? colors.primary[500] : colors.dark[500] }}
        className={`checkbox--label checkbox--label--light`}
      >
        {label}
      </span>
    </button>
  );
};
