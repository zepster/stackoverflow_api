import { moduleName } from './actions';
export function getSearch(store) {
  return store[moduleName];
}