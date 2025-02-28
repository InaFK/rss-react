import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedItem {
  id: string;
  name: string;
  description: string;
  detailsUrl: string;
}

interface SelectedItemsState {
  items: SelectedItem[];
}

const initialState: SelectedItemsState = {
  items: [],
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<SelectedItem>) => {
      if (!state.items.some(item => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    unselectAll: (state) => {
      state.items = [];
    },
    toggleCheckboxSelection: (state, action: PayloadAction<SelectedItem>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items.splice(index, 1);
      } else {
        state.items.push(action.payload);
      }
    },
  },
});

export const { selectItem, unselectItem, unselectAll, toggleCheckboxSelection } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
export type { SelectedItem, SelectedItemsState };
