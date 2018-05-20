import { moduleName } from './actions';
export function getQuestions(store) {
  return store[moduleName].items;
}

export function getLoadingStatus(store) {
  return store[moduleName].isLoading;
}