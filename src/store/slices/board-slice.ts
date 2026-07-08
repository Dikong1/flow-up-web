import { createSlice } from '@reduxjs/toolkit';

import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '..';

interface IState {
    currrentBoardId: string;
}

const initialState: IState = {
    currrentBoardId: '',
};

const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        setCurrentBoardId(state, action: PayloadAction<string>) {
            state.currrentBoardId = action.payload;
        },
    },
});

export const { setCurrentBoardId } = boardSlice.actions;
export const selectCurrentBoardId = (state: RootState) =>
    state.board.currrentBoardId;

export default boardSlice.reducer;
