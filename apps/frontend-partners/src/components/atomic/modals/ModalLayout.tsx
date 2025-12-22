import React from 'react';
import { colors } from '../../../assets/constant/colors copy';
import { CloseIcon, SaveIcon, SpinerIcon } from '../../../assets/svg/Icon';
import Button from '../Button';

type ModalLayout = {
  btnValidate?: 'primary' | 'secondary' | 'tertiary' | 'danger' | '';
  btnCancel?: 'primary' | 'secondary' | 'tertiary' | 'danger' | '';
  width?: number | null;
  title?: string | null;
  isLoading?: boolean;
  hiddenBtn?: boolean;
  children?: React.ReactNode;
  onCancel?: () => void;
  onClose?: () => void;
  onValidate?: () => void;
  disabled?: boolean;
};

export const ModalLayout = ({
  btnValidate = 'primary',
  btnCancel = '',
  title,
  isLoading,
  children,
  hiddenBtn,
  width,
  onCancel,
  onClose,
  onValidate,
  disabled = false,
}: ModalLayout) => {
  return (
    <div className='modalLayout'>
      <div width={width as number} className='modalLayout-container'>
        <div className='modalLayout-container-header'>
          <div className='modalLayout-container-header-title'>{title}</div>
          <div className='modalLayout-container-header-close'>
            <button
              onClick={onClose}
              className='modalLayout-container-header-close-btn'
              disabled={isLoading || disabled}
            >
              X
            </button>
          </div>
        </div>
        <div className='modalLayout-container-body'>{children}</div>
        {!hiddenBtn && (
          <div className='modalLayout-container-footer'>
            <Button
              label='Annuler'
              size='large'
              onClick={onCancel}
              variant={btnCancel || 'tertiary'}
              className='modalLayout-container-footer-button'
              Icon={<CloseIcon stroke={colors.primary['400']} />}
            />
            <Button
              disabled={isLoading || disabled}
              label={isLoading ? 'En cours...' : 'Valider'}
              variant={btnValidate || 'primary'}
              size='large'
              onClick={onValidate}
              className='modalLayout-container-footer-button'
              Icon={
                isLoading ? (
                  <SpinerIcon />
                ) : (
                  <SaveIcon stroke={colors.dark[50]} />
                )
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};
