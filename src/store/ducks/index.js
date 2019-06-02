import { combineReducers } from 'redux';

import { reducer as repositories } from './repositories';

const reducers = combineReducers({
  repositories,
});

export default reducers;
