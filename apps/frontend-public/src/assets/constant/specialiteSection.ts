import service5 from '../images/metier-img/electricite1.jpg'
import service1 from '../images/metier-img/maconnerie001.jpg'
import { default as service2 } from '../images/metier-img/menuisierie1.jpg'
import service6 from '../images/metier-img/plomberie.jpg'

export const specialiteSection: {
  picture: string
  title: string
}[] = [
  {
    picture: service1,
    title: 'Maçonnerie',
  },
  {
    picture: service2,
    title: 'Menuisierie',
  },
  {
    picture: service6,
    title: 'Plomberie',
  },
  {
    picture: service5,
    title: 'Electricité',
  },
]
