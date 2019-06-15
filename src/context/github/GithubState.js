import React, { useReducer } from 'react';
import axios from 'axios';
import { BASE_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } from '../../configs/api';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const searchUsers = async (text) => {
    setLoading();

    const res = await axios.get(`${BASE_URL}/search/users`, {
      params: {
        q: text,
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
      },
    });

    dispatch({ type: SEARCH_USERS, payload: res.data.items });
  };

  const getUser = async (username) => {
    setLoading();

    const res = await axios.get(`${BASE_URL}/users/${username}`, {
      params: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
      },
    });

    dispatch({ type: GET_USER, payload: res.data });
  };
  
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const getUserRepos = async (username) => {
    setLoading();

    const res = await axios.get(`${BASE_URL}/users/${username}/repos`, {
      params: {
        per_page: 5,
        sort: 'created:asc',
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
      },
    });

    dispatch({ type: GET_REPOS, payload: res.data });
  };

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        ...state,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
};

export default GithubState;
