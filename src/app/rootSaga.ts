import { all } from 'redux-saga/effects';

import myListSaga from '~/pages/MyList/myListSaga';

export default function* rootSaga() {
    yield all([myListSaga()]);
}
