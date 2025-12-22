import React from 'react';
import {} from '../../../assets/utils';
// import { tFields, tVariantNames } from '../../../types/fields';

import { ChangeEventHandler, ReactNode } from 'react';

export type tVariantNames = 'quarter' | 'half' | 'third' | 'full';

export interface tFields {
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  disabled?: boolean;
  value?: string;
  variant?: tVariantNames | number;
  margin?: string | number;
  borderColor?: string;
  color?: string;
  icon?: ReactNode;
  iconPassword?: ReactNode;
  defaultValue?: string;
  autoComplete?: 'off' | 'on';
  onKeyPress?: ChangeEventHandler<HTMLInputElement>;
}

export interface tSelect {
  options: { name: string; value: string }[];
  defaultValue?: { name: string; value: string } | string;
  required?: boolean;
  width?: string | number;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}

export const Input: React.FC<tFields> = ({
  defaultValue,
  label,
  type = 'text',
  name,
  placeholder,
  onChange,
  disabled,
  value,
  variant = 'quarter',
  margin = '.5rem 0',
  icon,
  iconPassword,
  autoComplete = 'off',
  onKeyPress,
}) => {
  const variantValue: Record<tVariantNames, string> = {
    quarter: '24%',
    half: '48%',
    third: '70%',
    full: '100%',
  };
  const [error, setError] = React.useState<string | null>(null); // État pour les erreurs

  // Fonction de validation principale
  const validateInput = (inputValue: string): void => {
    // if (type === 'email') {
    //   if (!validateEmail(inputValue)) {
    //     setError('Veuillez saisir une adresse email valide.');
    //     return;
    //   }
    // } else if (type === 'password') {
    //   if (!validatePassword(inputValue)) {
    //     setError(
    //       'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
    //     );
    //     return;
    //   }
    // } else {
    //   if (!validateText(inputValue)) {
    //     setError(
    //       "Lettres, chiffres, espaces, apostrophes, traits d'union uniquement."
    //     );
    //     return;
    //   }
    // }
    setError(null); // Aucune erreur
  };

  // Gestion du changement d'entrée
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    validateInput(value); // Valider en fonction du type
    if (onChange) onChange(e); // Appeler la fonction parent si fournie
  };

  return (
    <div
      className='input'
      style={{ width: variantValue[variant] || variant, margin }}
    >
      <label>{label}</label>
      <div className='input-inputBlock' style={{ gap: '.5rem' }}>
        {icon}
        <input
          defaultValue={defaultValue}
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={handleChange}
          disabled={disabled}
          value={value}
          className='input-inputBlock-input'
          autoComplete={autoComplete}
          onKeyPress={onKeyPress}
          pattern='/^[a-zA-Z0-9 ]*$/'
          title='Autorise seulement lettres, chiffres et espaces'
          aria-invalid={error ? 'true' : 'false'}
        />
        {iconPassword && iconPassword}
      </div>
      {/* Afficher un message d'erreur si nécessaire */}
      {error && (
        <span className='input-error' style={{ fontSize: '0.75rem' }}>
          {error}
        </span>
      )}
    </div>
  );
};
