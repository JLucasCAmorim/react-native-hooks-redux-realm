import { put, call } from 'redux-saga/effects';
import RepositoriesActions from '../ducks/repositories';
import getRealm from '~/services/realm';
import api from '~/services/api';

export function* loadRepositories() {
  const realm = yield getRealm();
  const data = realm.objects('Repository').sorted('stars', true);
  yield put(RepositoriesActions.getRepositoriesSuccess(data));
}
export function* saveRepository({ input }) {
  try {
    const response = yield call(api.get, `/repos/${input}`);
    const repository = response.data;

    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = yield getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });
    yield put(RepositoriesActions.saveRepositorySuccess([data]));
  } catch (err) {
    yield put(RepositoriesActions.setError());
  }
}
export function* updateRepository({ repositoryName }) {
  try {
    const response = yield call(api.get, `/repos/${repositoryName}`);
    const repository = response.data;

    const data = {
      id: repository.id,
      name: repository.name,
      fullName: repository.full_name,
      description: repository.description,
      stars: repository.stargazers_count,
      forks: repository.forks_count,
    };

    const realm = yield getRealm();

    realm.write(() => {
      realm.create('Repository', data, 'modified');
    });
    yield put(RepositoriesActions.updateRepositorySuccess(data));
  } catch (err) {
    yield put(RepositoriesActions.setError());
  }
}
export function* deleteRepository({ repository }) {
  const realm = yield getRealm();
  const repositories = realm.objects('Repository');
  const filteredRepo = repositories.filtered(`id = ${repository.id}`);
  realm.write(() => {
    realm.delete(filteredRepo);
  });
  yield put(RepositoriesActions.deleteRepositorySuccess(repository));
}
