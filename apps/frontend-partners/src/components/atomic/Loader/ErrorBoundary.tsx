import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../../../assets/lottie/errorboudary-lottie.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto', // Ajuste la hauteur pour centrer verticalement
    //width: '500px', // Prend toute la largeur du conteneur
  },
};

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className='errorBoundary' style={{ textAlign: 'center' }}>
          <Lottie
            options={defaultOptions}
            height={600}
            width={600}
            isStopped={false}
            isPaused={false}
          />
          Une erreur s'est produite lors du chargement du composant.
        </div>
      );
    }
    return this.props.children;
  }
}
