import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import ROUTER_NAME from 'src/lib/constants/router';
import { loading, createAppErr, setProjectId } from '../app';
import { getInfoProjectApi, getStatusListApi, getTagsApi } from './api';
import { IProjectInfoRes, IProjectState, ITagTask, ITaskStatus } from './types';

const initialState: IProjectState = {
  loading: false,
  error: '',
  statusList: [],
  info: {
    _id: '',
    createdAt: '',
    description: '',
    name: '',
    originator: {
      id: '',
      name: '',
    },
  },
  tags: [],
};
export const getInfoService = createAsyncThunk(
  'project/getInfo',
  async ({ id }: { id: string }, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    try {
      const response = await getInfoProjectApi(id);
      return response as IProjectInfoRes;
    } catch (error) {
      thunkAPI.dispatch(setProjectId(''));
      thunkAPI.dispatch(
        createAppErr({
          title: error as string,
          navigate: ROUTER_NAME.welcome.path,
        })
      );
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(loading(false));
    }
  }
);
export const getStatusListService = createAsyncThunk(
  'project/getStatusList',
  async ({ projectId }: { projectId: string }, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    try {
      const response = await getStatusListApi(projectId);
      return response as ITaskStatus[];
    } catch (error) {
      thunkAPI.dispatch(setProjectId(''));
      thunkAPI.dispatch(
        createAppErr({
          title: error as string,
          navigate: ROUTER_NAME.welcome.path,
        })
      );
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(loading(false));
    }
  }
);
export const getTagsService = createAsyncThunk(
  'project/getTags',
  async ({ projectId }: { projectId: string }, thunkAPI) => {
    thunkAPI.dispatch(loading(true));
    try {
      const response = await getTagsApi(projectId);
      return response as ITagTask[];
    } catch (error) {
      thunkAPI.dispatch(setProjectId(''));
      thunkAPI.dispatch(
        createAppErr({
          title: error as string,
          navigate: ROUTER_NAME.welcome.path,
        })
      );
      return thunkAPI.rejectWithValue(error);
    } finally {
      thunkAPI.dispatch(loading(false));
    }
  }
);
const projectSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(String(getInfoService.pending), (state: IProjectState) => {
        state.loading = true;
      })
      .addCase(
        String(getInfoService.fulfilled),
        (state: IProjectState, { payload }: PayloadAction<IProjectInfoRes>) => {
          state.loading = false;
          state.error = '';
          state.info = {
            ...payload,
          };
        }
      )
      .addCase(
        getInfoService.rejected,
        (state: IProjectState, { payload }: PayloadAction<any>) => {
          state.loading = false;
          state.error = payload;
        }
      )
      .addCase(
        String(getStatusListService.fulfilled),
        (state: IProjectState, { payload }: PayloadAction<ITaskStatus[]>) => {
          state.statusList = payload;
        }
      )
      .addCase(
        String(getTagsService.fulfilled),
        (state: IProjectState, { payload }: PayloadAction<ITagTask[]>) => {
          state.tags = payload;
        }
      );
  },
});

export default projectSlice.reducer;
