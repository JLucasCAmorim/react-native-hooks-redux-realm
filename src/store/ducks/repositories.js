import { createActions, createReducer } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions({
  getRepositoriesRequest: [''],
  getRepositoriesSuccess: ['repositories'],
  saveRepositoryRequest: ['input'],
  saveRepositorySuccess: ['repository'],
  updateRepositoryRequest: ['repositoryName'],
  updateRepositorySuccess: ['repository'],
  deleteRepositoryRequest: ['repository'],
  deleteRepositorySuccess: ['repository'],
  setError: [''],
});

export const RepositoriesTypes = Types;
export default Creators;

// Initial state

export const INITIAL_STATE = Immutable({
  list: [],
  loading: false,
  error: false,
});

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_REPOSITORIES_REQUEST]: state => state.merge({ loading: true }),
  [Types.GET_REPOSITORIES_SUCCESS]: (state, { repositories }) => {
    const newArray = [...state.list, ...repositories];
    return state.merge({ list: newArray, loading: false });
  },
  [Types.SET_ERROR]: state => state.merge({ error: true }),
  [Types.SAVE_REPOSITORY_SUCCESS]: (state, { repository }) => {
    const newArray = [...state.list, ...repository];
    return state.merge({ list: newArray, error: false });
  },
  [Types.UPDATE_REPOSITORY_SUCCESS]: (state, { repository }) => {
    const newArray = state.list.map(repo => (repo.id === repository.id ? repository : repo));
    return state.merge({ list: newArray, error: false });
  },
  [Types.DELETE_REPOSITORY_SUCCESS]: (state, { repository }) => {
    const newArray = state.list.filter(repo => (repo.id !== repository.id));
    return state.merge({ list: newArray, error: false });
  },
});
