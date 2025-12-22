import { useState } from 'react'
import Lottie from 'react-lottie'
import * as animationData from '../../../assets/lottie/successSecond-lottie.json'
import { useModalStore } from '../../../store/modal.store'
import { ModalLayout } from './ModalLayout'

export const ModalSuccess = () => {
  const [isLottiePlaying, setIsLottiePlaying] = useState({
    isStopped: false,
    isPaused: false,
  })
  // handle input change
  const setModalSuccessAction = useModalStore((s) => s.setModalSuccessAction)

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }

  return (
    <ModalLayout
      hiddenBtn
      width={1000}
      title={'Félicitations'}
      onCancel={() => setModalSuccessAction('successModal', false)}
      onClose={() => setModalSuccessAction('successModal', false)}
      onValidate={() => {}}
    >
      <div className="modalSuccess-container">
        <div className="modalSuccess-container-body">
          <Lottie
            options={defaultOptions}
            height={200}
            width={200}
            style={{ marginBottom: '1rem' }}
            isStopped={isLottiePlaying.isStopped}
            isPaused={isLottiePlaying.isPaused}
          />
          <p className="modalSuccess-container-body-item">
            Votre demande a bien été prise en compte
          </p>
          <p className="modalSuccess-container-body-item">
            Verifier le mail que nous vous avons envoyé pour confirmer votre
            demande, vous allez voir un lien de paiement de nos services
          </p>
          <p className="modalSuccess-container-body-item">
            Merci de nous avoir fait confiance
          </p>
        </div>
      </div>
    </ModalLayout>
  )
}
