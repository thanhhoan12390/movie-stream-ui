import { fork, takeEvery, put } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import {
    addToMyList,
    addToMyListSuccess,
    addToMyListFailed,
    getMyList,
    getMyListSuccess,
    getMyListFailed,
    deleteFromMyList,
    deleteFromMyListSuccess,
    deleteFromMyListFailed,
    addToLikedList,
    addToLikedListSuccess,
    addToLikedListFailed,
    getLikedList,
    getLikedListSuccess,
    getLikedListFailed,
    deleteFromLikedList,
    deleteFromLikedListSuccess,
    deleteFromLikedListFailed,
} from './myListSlice';

function* handleAddToMyList(action: PayloadAction<number>) {
    try {
        const localStorageList = localStorage.getItem('myList');
        let myList: Array<number> = [];

        if (!!localStorageList) {
            myList = JSON.parse(localStorageList);
        }

        if (!myList || myList.length === 0) {
            yield localStorage.setItem('myList', JSON.stringify([action.payload]));
            yield put(addToMyListSuccess([action.payload]));
        } else {
            const existedId = myList.find((id) => id === action.payload);

            if (!existedId) {
                yield localStorage.setItem('myList', JSON.stringify([action.payload, ...myList]));
                yield put(addToMyListSuccess([action.payload, ...myList]));
            } else yield put(addToMyListSuccess(myList));
        }
    } catch (error) {
        yield put(addToMyListFailed('Có lỗi xảy ra'));
    }
}

function* handleGetMyList() {
    try {
        const localStorageList = localStorage.getItem('myList');
        let myList: Array<number> = [];

        if (!!localStorageList) {
            myList = JSON.parse(localStorageList);
        }

        yield put(getMyListSuccess(myList));
    } catch (error) {
        yield put(getMyListFailed('Có lỗi xảy ra'));
    }
}

function* handleDeleteFromMyList(action: PayloadAction<number>) {
    try {
        const localStorageList = localStorage.getItem('myList');
        let myList: Array<number> = [];

        if (!!localStorageList) {
            myList = JSON.parse(localStorageList);
        }

        if (!!myList && myList.length !== 0) {
            const newMyList = myList.filter((id) => id !== action.payload);
            yield localStorage.setItem('myList', JSON.stringify(newMyList));
            yield put(deleteFromMyListSuccess(newMyList));
        } else yield put(deleteFromMyListFailed('MyList has no item'));
    } catch (error) {
        yield put(deleteFromMyListFailed('Có lỗi xảy ra'));
    }
}

function* handleAddToLikedList(action: PayloadAction<number>) {
    try {
        const localStorageList = localStorage.getItem('likedList');
        let likedList: Array<number> = [];

        if (!!localStorageList) {
            likedList = JSON.parse(localStorageList);
        }

        if (!likedList || likedList.length === 0) {
            yield localStorage.setItem('likedList', JSON.stringify([action.payload]));
            yield put(addToLikedListSuccess([action.payload]));
        } else {
            const existedId = likedList.find((id) => id === action.payload);

            if (!existedId) {
                yield localStorage.setItem('likedList', JSON.stringify([action.payload, ...likedList]));
                yield put(addToLikedListSuccess([action.payload, ...likedList]));
            } else yield put(addToLikedListSuccess(likedList));
        }
    } catch (error) {
        yield put(addToLikedListFailed('Có lỗi xảy ra'));
    }
}

function* handleGetLikedList() {
    try {
        const localStorageList = localStorage.getItem('likedList');
        let likedList: Array<number> = [];

        if (!!localStorageList) {
            likedList = JSON.parse(localStorageList);
        }

        yield put(getLikedListSuccess(likedList));
    } catch (error) {
        yield put(getLikedListFailed('Có lỗi xảy ra'));
    }
}

function* handleDeleteFromLikedList(action: PayloadAction<number>) {
    try {
        const localStorageList = localStorage.getItem('likedList');
        let likedList: Array<number> = [];

        if (!!localStorageList) {
            likedList = JSON.parse(localStorageList);
        }

        if (!!likedList && likedList.length !== 0) {
            const newLikedList = likedList.filter((id) => id !== action.payload);
            yield localStorage.setItem('likedList', JSON.stringify(newLikedList));
            yield put(deleteFromLikedListSuccess(newLikedList));
        } else yield put(deleteFromMyListFailed('LikedList has no item'));
    } catch (error) {
        yield put(deleteFromLikedListFailed('Có lỗi xảy ra'));
    }
}

function* watchMyListFlow() {
    yield takeEvery(addToMyList.toString(), handleAddToMyList);
    yield takeEvery(getMyList.toString(), handleGetMyList);
    yield takeEvery(deleteFromMyList.toString(), handleDeleteFromMyList);
    yield takeEvery(addToLikedList.toString(), handleAddToLikedList);
    yield takeEvery(getLikedList.toString(), handleGetLikedList);
    yield takeEvery(deleteFromLikedList.toString(), handleDeleteFromLikedList);
}

export default function* myListSaga() {
    yield fork(watchMyListFlow);
}
