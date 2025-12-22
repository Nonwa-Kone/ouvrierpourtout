import { CheckIcon } from 'lucide-react';
import React, { MouseEventHandler } from 'react';
import { colors } from '../../../assets/constant/colors copy';

export type tCheckboxBtn = {
  active: boolean;
  label?: string | undefined;
  onCheck: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit' | undefined;
};

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
