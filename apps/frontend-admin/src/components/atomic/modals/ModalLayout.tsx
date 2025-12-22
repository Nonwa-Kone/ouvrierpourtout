import { SaveIcon, X } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { colors } from '../../../assets/constant/colors copy';
import Button from '../Button';

const ModalLayoutStyled = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #221e1e5d;
  transition: all 0.3s ease-in-out;
  z-index: 1000;
`;

const ModalConatiner = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  height: auto;
  margin-inline: auto;
  background-color: rgb(255, 255, 255);
  border: 1px solid #ededed;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* width: 100%; */
  padding: 1rem;
  /* border-bottom: 1px solid #ededed; */
  margin-bottom: 1rem;
`;

const ModalBody = styled.div`
  width: 100%;
  height: auto;
  margin: 1rem 0;
`;

const ModalFooter = styled.div`
  /* width: 100%; */
  height: auto;
  padding: 1rem;
  padding-bottom: 0;
  display: flex;
  justify-content: start;
  align-items: start;
  border-top: 1px solid #ededed;
`;

const ModalHeaderText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: #212121;
`;

const ButonCancel = styled.button`
  padding: 0.5rem;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  font-family: 'Roboto Bold';
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  /* box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1); */
`;

type ModalLayout = {
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
  title,
  children,
  hiddenBtn,
  width = 600,
  onCancel,
  onClose,
  onValidate,
}: ModalLayout) => {
  return (
    <ModalLayoutStyled className='modalLayout'>
      <ModalConatiner width={width as number} className='modalLayout-container'>
        <ModalHeader className='modalLayout-container-header'>
          <ModalHeaderText>{title}</ModalHeaderText>
          <div>
            <ButonCancel onClick={onClose}>
              <X />
            </ButonCancel>
          </div>
        </ModalHeader>
        <ModalBody className='modalLayout-container-body'>{children}</ModalBody>
        {!hiddenBtn && (
          <ModalFooter className='modalLayout-container-footer'>
            <Button
              style={{
                flex: 1,
                backgroundColor: colors.dark['100'],
                color: colors.dark['500'],
              }}
              label='Annuler'
              size='large'
              onClick={onCancel}
              Icon={<X />}
            />
            <Button
              style={{
                flex: 1,
                backgroundColor: colors.primary['500'],
                color: colors.light['50'],
              }}
              label='Valider'
              size='large'
              onClick={onValidate}
              Icon={<SaveIcon />}
            />
          </ModalFooter>
        )}
      </ModalConatiner>
    </ModalLayoutStyled>
  );
};
