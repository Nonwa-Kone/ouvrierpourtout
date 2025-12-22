import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { checkAuthByToken } from '../../api/member.api';
import { checkAuthByToken } from '../../api/user.api';
import { useUserStore } from '../../stores/user.store';

export const useAuthentificate = () => {
  const navigate = useNavigate();
  const setUserStore = useUserStore((state) => state.setUserStore);

  const handleCheckToken = React.useCallback(() => {
    (async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          navigate('/');
          sessionStorage.clear();
          toast.error('Token inexistant, veuillez vous reconnecter.');
          return;
        }
        const response = await checkAuthByToken();
        if (!response.success) {
          navigate('/');
          sessionStorage.clear();
          toast.error('Token invalide, veuillez vous reconnecter.');
        }
        setUserStore('user', response.data);
      } catch (error) {
        navigate('/');
        sessionStorage.clear();
        toast.error(error as string);
      }
    })();
  }, [navigate]);

  React.useEffect(() => {
    handleCheckToken();
  }, []);
};
