import { combineReducers } from 'redux';
import { questionReducer, moduleName } from './question';
import { searchReducer, moduleName as searchModuleName } from './search';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer() {
  return combineReducers({
    [moduleName]: questionReducer,
    [searchModuleName]: searchReducer
  });
}
