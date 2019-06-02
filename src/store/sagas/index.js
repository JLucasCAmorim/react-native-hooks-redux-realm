import { all, takeLatest } from 'redux-saga/effects';
import { RepositoriesTypes } from '../ducks/repositories';
import {
  loadRepositories, saveRepository, updateRepository, deleteRepository,
} from './repositories';

export default function* rootSaga() {
  yield all([
    takeLatest(RepositoriesTypes.GET_REPOSITORIES_REQUEST, loadRepositories),
    takeLatest(RepositoriesTypes.SAVE_REPOSITORY_REQUEST, saveRepository),
    takeLatest(RepositoriesTypes.UPDATE_REPOSITORY_REQUEST, updateRepository),
    takeLatest(RepositoriesTypes.DELETE_REPOSITORY_REQUEST, deleteRepository),
  ]);
}
