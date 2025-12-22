import { colors } from '../constant/colors copy';

export const genderLabel = (gender: string) => {
  switch (gender) {
    case 'man':
      return 'Homme';
    case 'woman':
      return 'Femme';
    case 'other':
      return 'Autre';
    default:
      return 'Autre';
  }
};

export const statusLayout = (
  status: string
): Record<'label' | 'color' | 'bg', string> => {
  switch (status) {
    case 'created':
      return {
        label: 'Crée',
        color: colors.primary[500],
        bg: colors.primary[100],
      };
    case 'pending':
      return {
        label: 'En attente',
        color: colors.dark[500],
        bg: colors.dark[100],
      };
    case 'in_progress':
      return {
        label: 'en cours de traitement',
        color: colors.dark[500],
        bg: colors.dark[100],
      };
    case 'valided':
      return {
        label: 'Validé',
        color: colors.success[500],
        bg: colors.success[100],
      };
    case 'accepted':
      return {
        label: 'Succès',
        color: colors.success[500],
        bg: colors.success[100],
      };
    case 'approved':
      return {
        label: 'approuvé',
        color: colors.success[500],
        bg: colors.success[100],
      };
    case 'canceled':
      return {
        label: 'Annulé',
        color: colors.danger[500],
        bg: colors.danger[100],
      };
    case 'refused':
      return {
        label: 'Rejeté',
        color: colors.danger[500],
        bg: colors.danger[100],
      };
    case 'failed':
      return {
        label: 'Echoué',
        color: colors.danger[500],
        bg: colors.danger[100],
      };
    case 'clotured':
      return {
        label: 'Clôturé',
        color: colors.success['500'],
        bg: colors.success['100'],
      };

    default:
      return {
        label: 'En attente',
        color: colors.dark[500],
        bg: colors.dark[100],
      };
  }
};

export const statusPayment = (
  status: string
): Record<'label' | 'color' | 'bg', string> => {
  switch (status) {
    case 'paid':
      return {
        label: 'Payé',
        color: colors.success[500],
        bg: colors.success[100],
      };
    case 'pending':
      return {
        label: 'Impayé',
        color: colors.danger[500],
        bg: colors.danger[100],
      };
    case 'refused':
      return {
        label: 'Rejeté',
        color: colors.danger[500],
        bg: colors.danger[100],
      };
    case 'in_progress':
      return {
        label: 'en cours de traitement',
        color: colors.dark[500],
        bg: colors.dark[100],
      };
    default:
      return {
        label: 'En attente',
        color: colors.dark[500],
        bg: colors.dark[100],
      };
  }
};
