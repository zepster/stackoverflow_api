import { questionActions } from './actions';

export const initialData = {
  isLoading: false,
  items: []
};
export function questionReducer(state = initialData, action) {
  switch (action.type) {
    case questionActions.GET_SUCCESS:
      return {...initialData, items: action.payload};
    case questionActions.GET_FAILURE:
      return {...initialData};
    case questionActions.GET_REQUEST:
      return {...state, isLoading: true};
    case questionActions.INCREMENT_SCORE:
      return {
        ...state,
        items: state.items.map(v => {
          if (v.question_id === action.payload) {
            return {...v, score: v.score +1 }
          } 
          return v;
        })
      }
    case questionActions.DECREMENT_SCORE:
      return {
        ...state,
        items: state.items.map(v => {
          if (v.question_id === action.payload) {
            return {...v, score: v.score - 1 }
          } 
          return v;
        })
      }
    case questionActions.CHANGE_ORDER:
      const fromElement = {...state.items[action.payload.from]}
      const toElement = {...state.items[action.payload.to]}
      return {
        ...state,
        items: state.items.map((v, i) => {
          if (i === action.payload.from) {
            return toElement;
          } 
          if (i === action.payload.to) {
            return fromElement;
          }
          return v;
        })
      }
    default:
      return state;
  }
}
