import React from 'react';
// import './Spinner.css'; // Importez un fichier CSS pour le style

const Spinner: React.FC<{ size?: string; color?: string }> = ({
  size = '50px',
  color = '#3498db',
}) => {
  return (
    <div className='spinner-container'>
      <div
        className='spinner'
        style={{
          width: size,
          height: size,
          border: `4px solid ${color}33`, // Couleur semi-transparente pour l'arrière-plan
          borderTop: `4px solid ${color}`, // Couleur principale
        }}
      ></div>
    </div>
  );
};

export default Spinner;
