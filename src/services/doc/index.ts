import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loading } from '../app';
import { getListDocSelectsApi } from './api';
import { IDocSelectOption, IDocStore, IGetListDocSelectRes } from './types';

const initialState: IDocStore = {
  docSelect: [],
};
export const getDocSelectService = createAsyncThunk(
  'doc/getDocSelect',
  async ({ projectId }: { projectId: string }, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    try {
      const docs: Array<IGetListDocSelectRes> = await getListDocSelectsApi(
        projectId
      );
      return docs.map((item) => ({
        value: item._id,
        label: item.title,
        members: item.members.map((member) => ({
          value: member.id_member,
          label: member.name,
        })),
      })) as IDocSelectOption[];
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(loading(false));
    }
  }
);
const docSlice = createSlice({
  name: 'doc',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(String(getDocSelectService.pending), (state: IDocStore) => {
        state = initialState;
      })
      .addCase(
        String(getDocSelectService.fulfilled),
        (state: IDocStore, { payload }: PayloadAction<IDocSelectOption[]>) => {
          state.docSelect = payload;
        }
      )
      .addCase(getDocSelectService.rejected, (state: IDocStore) => {
        state = initialState;
      });
  },
});

export default docSlice.reducer;
