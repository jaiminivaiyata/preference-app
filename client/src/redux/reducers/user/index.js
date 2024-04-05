const initialState = {
  user_details: {},
}

export const user = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'USER_DETAILS':
      return { ...state, user_details: payload }
    case 'USER_LOGOUT':
      return { ...state, user_details: {} }
    case 'UPDATE_PRIMARY_COLOR':
      return {
        ...state, user_details: {
          ...state.user_details,
          "preference": payload
        }
      }
    default:
      return state
  }
}
