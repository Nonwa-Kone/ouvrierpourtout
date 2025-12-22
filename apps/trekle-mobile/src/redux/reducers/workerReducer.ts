import workerData from '../../../data/workerData';
import { IWorker } from '../../../interfaces/worker';

export interface IInitalStateWorker {
  workerData: IWorker[];
  totalWorkers?: number;
}

const initalState: IInitalStateWorker = {
  workerData: workerData,
  totalWorkers: 0,
};

const workerReducer = (state = initalState, action: any) => {
  switch (action.type) {
    case 'ADD_WORKER':
      return [...state.workerData, action.payload];
    case 'UPDATE_WORKER':
      return state.workerData.map((worker) => {
        if (worker.id === action.payload.id) {
          return action.payload;
        }
        return worker;
      });
    case 'DELETE_WORKER':
      return state.workerData.filter((worker) => worker.id !== action.payload);
    default:
      return state;
  }
};

export default workerReducer;
