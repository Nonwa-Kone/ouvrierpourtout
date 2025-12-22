import React, { ErrorInfo, ReactNode } from 'react'
import Lottie from 'react-lottie'
import animationData from '../../../assets/lottie/errorboudary-lottie.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'auto', // Ajuste la hauteur pour centrer verticalement
  },
}

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary" style={{ textAlign: 'center' }}>
          <Lottie
            options={defaultOptions}
            height={600}
            width={600}
            isStopped={false}
            isPaused={false}
          />
          Une erreur s'est produite lors du chargement du composant.
        </div>
      )
    }

    return this.props.children
  }
}
