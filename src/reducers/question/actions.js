import { getService, serviceNames } from '../../services/api';

export const moduleName = 'question'

export const questionActions = {
  GET_REQUEST: `${moduleName}/GET_REQUEST`,
  GET_SUCCESS: `${moduleName}/GET_SUCCESS`,
  GET_FAILURE: `${moduleName}/GET_FAILURE`,

  INCREMENT_SCORE: `${moduleName}/INCREMENT_SCORE`,
  DECREMENT_SCORE: `${moduleName}/DECREMENT_SCORE`,
  CHANGE_ORDER: `${moduleName}/CHANGE_ORDER`,

  //actions
  increment: id => ({
    type: questionActions.INCREMENT_SCORE,
    payload: id,
  }),
  decrement: id => ({
    type: questionActions.DECREMENT_SCORE,
    payload: id,
  }),
  changeOrder: (from, to) => ({
    type: questionActions.CHANGE_ORDER,
    payload: { from, to },
  }),
  setQuestions: (questions) => ({
    type: questionActions.GET_SUCCESS,
    payload: questions
  }),
  unsetQuestions: (questions) => ({
    type: questionActions.GET_FAILURE,
  }),
  setLoadStatus: status => ({
    type: questionActions.GET_REQUEST,
    payload: status
  }),

  getQuestions: (date, q) => dispatch => {
    const api = getService(serviceNames.stack);
    dispatch(questionActions.setLoadStatus(true));
    api.search({
      page: 1,
      pagesize: 5,
      fromdate: date.format('X'),
      intitle: q
    }).then(({ data }) => {
      dispatch(questionActions.setQuestions(data.items));
    }).catch(err => {
      dispatch(questionActions.unsetQuestions());
    })
  },
};