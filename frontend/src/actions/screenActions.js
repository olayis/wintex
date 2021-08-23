import { SCREEN_LOADING, SCREEN_LOADED } from '../constants/screenConstants';

export const loadScreen = () => (dispatch) => {
  dispatch({ type: SCREEN_LOADING });
};

export const loadedScreen = () => (dispatch) => {
  dispatch({ type: SCREEN_LOADED });
};
