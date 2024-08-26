import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import homeReducer from '~/pages/Home/homeSlice';
import myListReducer from '~/pages/MyList/myListSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: {
        home: homeReducer,
        myList: myListReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
