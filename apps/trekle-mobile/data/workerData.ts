import { IWorker } from '../interfaces/worker';

const workerData: IWorker[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 123-456-7890',
    avatar: 'https://example.com/avatar.jpg',
    image:
      'https://www.pexels.com/fr-fr/photo/homme-en-costume-de-gommage-bleu-avec-masque-blanc-5327656/',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phone: '+1 123-456-7890',
    avatar: 'https://example.com/avatar.jpg',
    image:
      'https://www.pexels.com/fr-fr/photo/cafe-tasse-bureau-ordinateur-portable-4474041/',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
  {
    id: '3',
    firstName: 'Bob',
    lastName: 'Doe',
    email: 'bob.doe@example.com',
    phone: '+1 123-456-7890',
    avatar:
      'https://www.pexels.com/fr-fr/photo/homme-portant-un-pantalon-en-denim-noir-avec-marteau-de-transport-sur-l-etui-8092/',
    image: '../assets/img/3.jpg',
    createdAt: '2023-01-01T00:00:00.000Z',
    updatedAt: '2023-01-01T00:00:00.000Z',
  },
];

export default workerData;
