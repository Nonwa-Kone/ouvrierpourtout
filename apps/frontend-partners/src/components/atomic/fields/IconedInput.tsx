import React, { ChangeEventHandler, ReactNode } from 'react';
import { colors } from '../../../assets/constant/colors copy';
// import { colors } from '../../../assets/constants/colors';
// import {
//   validateEmail,
//   validatePassword,
//   validateText,
// } from '../../../assets/utils';

interface iIconedInpuite {
  placeholder?: string;
  icon?: ReactNode;
  onChange: (e: ChangeEventHandler<HTMLInputElement>) => void;
  onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  classNameInput?: string;
  styleInput?: React.CSSProperties;
  type?: string;
  name?: string;
  defaultValue?: string;
}

export const IconedInput: React.FC<iIconedInpuite> = ({
  placeholder,
  icon,
  onChange,
  onKeyPress,
  value,
  className,
  style,
  classNameInput,
  styleInput,
  type = 'text',
  name,
  defaultValue,
}) => {
  const [error, setError] = React.useState<string | null>(null); // État pour les erreurs
  // Fonction de validation principale
  // const validateInput = (inputValue: string): void => {
  //   if (type === 'email') {
  //     if (!validateEmail(inputValue)) {
  //       setError('Veuillez saisir une adresse email valide.');
  //       return;
  //     }
  //   } else if (type === 'password') {
  //     if (!validatePassword(inputValue)) {
  //       setError(
  //         'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.'
  //       );
  //       return;
  //     }
  //   } else {
  //     if (!validateText(inputValue)) {
  //       setError(
  //         "Lettres, chiffres, espaces, apostrophes, traits d'union uniquement."
  //       );
  //       return;
  //     }
  //   }
  //   setError(null); // Aucune erreur
  // };

  // Gestion du changement d'entrée
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    // validateInput(value); // Valider en fonction du type
    if (onChange) onChange(e); // Appeler la fonction parent si fournie
  };

  return (
    <>
      <div className={'iconed-input ' + className} style={style}>
        {icon}
        <input
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyPress={onKeyPress}
          value={value}
          name={name}
          className={'iconed-input-input ' + classNameInput}
          style={styleInput}
          type={type}
          pattern='/^[a-zA-Z0-9 ]*$/'
          title='Autorise seulement lettres, chiffres et espaces'
          aria-invalid={error ? 'true' : 'false'}
        />
      </div>
      {/* Afficher un message d'erreur si nécessaire */}
      {error && (
        <span
          className='input-error'
          style={{
            fontSize: '0.75rem',
            marginTop: '0.2rem',
            padding: '0.3rem 0.5rem',
            backgroundColor: colors.danger['100'],
            color: colors.danger['600'],
          }}
        >
          {error}
        </span>
      )}
    </>
  );
};
