import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '~/app/store';

export interface HomeState {
    viewId: number;
    status: 'idle' | 'loading' | 'failed';
}

const initialState: HomeState = {
    viewId: 0,
    status: 'idle',
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setViewId: (state, action: PayloadAction<number>) => {
            state.viewId = action.payload;
        },
        removeViewId: (state) => {
            state.viewId = 0;
        },
    },
});

export default homeSlice.reducer;

export const { setViewId, removeViewId } = homeSlice.actions;

export const viewIdSelector = (state: RootState) => state.home.viewId;
