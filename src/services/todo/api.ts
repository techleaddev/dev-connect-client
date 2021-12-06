import {
  deleteService,
  getService,
  postService,
  putService,
} from 'src/lib/helpers/connectApi';
import { IEditTodoReq, ITodoItem } from './types';
const endpoint = '/todo';

export const getListTodoApi = (searchKey?: string) => {
  return getService(endpoint,{
    searchKey
  });
};

export const switchTodoItem = (id: string, newNumber: number) => {
  return putService(`${endpoint}/index`, {
    id,
    newNumber,
  });
};

export const updateStatusItem = (id: string, status: boolean) => {
  return putService(endpoint, {
    id,
    status,
  });
};

export const updateTodoItem = (item: IEditTodoReq) => {
  return putService(endpoint, item);
};

export const createTodoItem = (item: ITodoItem) => {
  return postService(`${endpoint}`, {
    title: item?.title,
    description: item?.description,
  });
};

export const deleteItem = (id: string) => {
  return deleteService(`${endpoint}/${id}`);
};
