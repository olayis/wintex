import { SCREEN_LOADING, SCREEN_LOADED } from '../constants/screenConstants';

export const screenLoadReducer = (state = { loading: false }, action) => {
  switch (action.type) {
    case SCREEN_LOADING:
      return { loading: true };

    case SCREEN_LOADED:
      return { loading: false };

    default:
      return state;
  }
};
