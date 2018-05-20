import { searchActions } from './actions';

export const initialData = {
  date: '01.01.2018',
  q: 'react-redux'
};
export function searchReducer(state = initialData, action) {
  switch (action.type) {
    case searchActions.SET_DATE:
      return {...state, date: action.payload};
    default:
      return state;
  }
}
