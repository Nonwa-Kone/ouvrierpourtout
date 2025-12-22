import React from 'react'
import { IoClose } from 'react-icons/io5'
import Button from '../Button'

import { ImSpinner } from 'react-icons/im'
import colors from '../../../assets/constant/colors'
import { CloseIcon, SaveIcon } from '../../../assets/svg/Icon'

// import './index.scss'

type ModalLayouts = {
  width?: number | null
  title?: string | null
  isLoading?: boolean
  hiddenBtn?: boolean
  children?: React.ReactNode
  onCancel?: () => void
  onClose?: () => void
  onValidate?: () => void
  disabled?: boolean
}

export const ModalLayout = ({
  title,
  children,
  hiddenBtn,
  onCancel,
  onClose,
  onValidate,
  isLoading,
  disabled = false,
}: ModalLayouts) => {
  return (
    <div className="modalLayout">
      <div className="modalLayout-container">
        <div className="modalLayout-container-header">
          <div className="modalLayout-container-header-title">{title}</div>
          <div className="modalLayout-container-header-close">
            <button
              onClick={onClose}
              title="Fermer"
              className="modalLayout-container-header-close-btn"
              disabled={isLoading || disabled}
            >
              <IoClose />
            </button>
          </div>
        </div>
        <div className="modalLayout-container-body">{children}</div>
        {!hiddenBtn && (
          <div className="modalLayout-container-footer">
            <Button
              title="Annuler"
              variant="primary"
              size="large"
              onClick={onCancel}
              icon={<CloseIcon stroke={colors.primary['400']} />}
              disabled={isLoading || disabled}
            />
            <Button
              disabled={isLoading || disabled}
              title={isLoading ? 'En cours...' : 'Valider'}
              size="large"
              onClick={onValidate}
              icon={
                isLoading ? <ImSpinner /> : <SaveIcon stroke={colors.white} />
              }
            />
          </div>
        )}
      </div>
    </div>
  )
}
