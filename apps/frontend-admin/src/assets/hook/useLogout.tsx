import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logoutAdmin } from '../../api/user.api';
import { useUserStore } from '../../stores/user.store';

export function useLogout() {
  const { setUserStore } = useUserStore((s) => s);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['user', 'logout'],
    mutationFn: async (id: string) => await logoutAdmin(id),
    onSuccess(data) {
      if (data.success) {
        sessionStorage.clear();
        setUserStore('user', null);
        navigate('/');
        toast.success(data.message);
      }
    },
    onError(error) {
      toast.error(error?.message);
    },
  });
}
