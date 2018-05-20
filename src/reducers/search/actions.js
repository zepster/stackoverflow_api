export const moduleName = 'search'

export const searchActions = {
  SET_DATE: `${moduleName}/SET_DATE`,

  setDate: date => ({
    type: searchActions.SET_DATE,
    payload: date,
  })
};