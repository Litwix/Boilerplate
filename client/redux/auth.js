import axios from 'axios';
import { createBrowserHistory } from 'history';

const TOKEN = 'token';
const history = createBrowserHistory();

// Action types:
const SET_AUTH = 'SET_AUTH';

// Action creators:
const setAuth = (auth) => {
  return {
    type: SET_AUTH,
    auth,
  };
};

// Thunk-tions:
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (error) {
      return dispatch(setAuth({ error }));
    }
  };

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// Reducer
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
