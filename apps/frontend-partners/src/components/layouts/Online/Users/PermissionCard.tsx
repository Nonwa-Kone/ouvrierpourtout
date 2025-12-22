import { CircleCheckIcon } from 'lucide-react';
import styled from 'styled-components';
import { colors } from '../../../../assets/constant/colors';
import { permissions } from '../../../../assets/constant/user';
import { useUserStore } from '../../../../stores/user.store';

const CardPermission = styled.div`
  /* width: 100%; */
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  margin-bottom: 0.5rem;
  padding: 1rem;
  text-decoration: none;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  background-color: white;
`;

const CardPermissionTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  &-text {
    font-size: 1.3rem;
    font-family: 'Roboto Bold';
    font-weight: bold;
    margin: 0;
    margin-bottom: 0.5rem;
    padding: 0;
  }
`;

const ButtonStyled = styled.button<{ size?: 'small' | 'medium' | 'large' }>`
  width: 100%;
  /* padding: 0 20px; */
  border-radius: 8px;
  background-color: white;
  color: ${colors.dark['100']};
  font-size: 16px;
  font-family: 'Roboto Bold';
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  border: 0;
  display: flex;
  justify-content: start;
  align-items: center;

  ${(props) => {
    if (props?.size === 'medium') {
      return `
        padding: 10px 0px;
        font-size: 18px;
      `;
    }
    if (props?.size === 'large') {
      return `
        padding: 15px 40px;
        font-size: 20px;
      `;
    }
    return `
      padding: 0px 0px;
      font-size: 16px;
    `;
  }}
`;

const ButtonStyledText = styled.p`
  font-size: 0.9rem;
  font-family: 'Inter Light', sans-serif;
  font-weight: bold;
  color: ${colors.gray['400']} !important;
  margin-bottom: 0.5rem;
  text-align: left;
`;

export const PermissionCard = () => {
  const setUserStore = useUserStore((s) => s.setUserStore);
  const formUser = useUserStore((s) => s.formUser);

  const handleClick = (value: string) => {
    console.log('🚀 ~ handleClick ~ value:', formUser?.role?.permissions);
    setUserStore('formUser', {
      ...formUser,
      role: {
        ...formUser?.role,
        permissions: formUser?.role?.permissions?.map((permission) => {
          if (permission.value === value) {
            return {
              ...permission,
              enabled: !permission.enabled,
            };
          } else {
            return permission;
          }
        }),
      },
    });
  };
  return (
    <CardPermission className='card-permission'>
      <CardPermissionTitle className='card-permission--title'>
        <p className='card-permission--title-text'>Permission & Accès</p>
      </CardPermissionTitle>
      <div className='card-permission--block'>
        {permissions.map((permission, index) => {
          //TODO: Permission utilisaterus à terminié demain
          const isSelected = formUser?.role?.permissions?.find(
            (_permission) => {
              _permission.value === permission.value && permission.enabled;
              console.log(
                '🚀 ~ {permissions.map ~ isSelected:',
                permission.enabled
              );
            }
          );

          return (
            <div>
              <ButtonStyled
                type='button'
                size='medium'
                key={index}
                onClick={() => handleClick(permission.value as string)}
              >
                {<CircleCheckIcon color={isSelected ? 'green' : 'red'} />}
                <ButtonStyledText>{permission.name}</ButtonStyledText>
              </ButtonStyled>
            </div>
          );
        })}
      </div>
    </CardPermission>
  );
};
