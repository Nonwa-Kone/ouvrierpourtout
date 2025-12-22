import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { checkAuthByToken } from '../../api/member.api';
// import { checkAuthByToken } from '../../api/user.api';
import { checkAuthByToken } from '../../api/partners.api';
import { usePartnersStore } from '../../stores/partners.store';

export const useAuthentificate = () => {
  const navigate = useNavigate();
  const setPartnerStore = usePartnersStore((state) => state.setPartnerStore);
  // const setUserStore = useUserStore((state) => state.setUserStore);

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
        setPartnerStore('partner', response.data);
      } catch (error) {
        navigate('/');
        sessionStorage.clear();
        toast.error(error?.message);
      }
    })();
  }, [navigate]);

  React.useEffect(() => {
    handleCheckToken();
  }, []);
};
