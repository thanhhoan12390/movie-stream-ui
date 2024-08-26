import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/app/store';

export interface MyListState {
    status: 'idle' | 'loading' | 'failed';
    myMoviesIdList: Array<number>;
    likedIdList: Array<number>;
}

const initialState: MyListState = {
    status: 'idle',
    myMoviesIdList: [],
    likedIdList: [],
};

const myListSlice = createSlice({
    name: 'myList',
    initialState,
    reducers: {
        addToMyList: (state, action: PayloadAction<number>) => {
            state.status = 'loading';
        },
        addToMyListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.myMoviesIdList = action.payload;
        },
        addToMyListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },
        getMyList: (state) => {
            state.status = 'loading';
        },
        getMyListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.myMoviesIdList = action.payload;
        },
        getMyListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },
        deleteFromMyList: (state, action: PayloadAction<number>) => {
            state.status = 'loading';
        },
        deleteFromMyListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.myMoviesIdList = action.payload;
        },
        deleteFromMyListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },

        addToLikedList: (state, action: PayloadAction<number>) => {
            state.status = 'loading';
        },
        addToLikedListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.likedIdList = action.payload;
        },
        addToLikedListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },
        getLikedList: (state) => {
            state.status = 'loading';
        },
        getLikedListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.likedIdList = action.payload;
        },
        getLikedListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },
        deleteFromLikedList: (state, action: PayloadAction<number>) => {
            state.status = 'loading';
        },
        deleteFromLikedListSuccess: (state, action: PayloadAction<Array<number>>) => {
            state.status = 'idle';
            state.likedIdList = action.payload;
        },
        deleteFromLikedListFailed: (state, action: PayloadAction<string>) => {
            console.log('Có lỗi xảy ra: : ', action.payload);
            state.status = 'failed';
        },
    },
});

export default myListSlice.reducer;

export const {
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
} = myListSlice.actions;

export const myListSelector = (state: RootState) => state.myList.myMoviesIdList;
export const likedListSelector = (state: RootState) => state.myList.likedIdList;
