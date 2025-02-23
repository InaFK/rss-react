import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SelectedPokemon {
  name: string;
  description: string;
}

export interface SelectionState {
  selected: SelectedPokemon | null;
}

const initialState: SelectionState = { selected: null };

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<SelectedPokemon>) => {
      state.selected = action.payload;
    },
    clearSelection: (state) => {
      state.selected = null;
    },
  },
});

export const { selectPokemon, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;
