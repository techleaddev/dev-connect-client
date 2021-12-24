import {
  getService,
  postService,
  putService,
} from 'src/lib/helpers/connectApi';
import { ITaskRes } from '../tasks/types';
import IDoc, { ICreateDocReq, IDocHistory, IEditDocReq } from './types';
const endpoint = '/doc';

export const getListDocsApi = (
  projectId: string,
  page?: number,
  searchKey?: string
) => {
  return getService(endpoint, { projectId, page, searchKey });
};

export const getListDocSelectsApi = (projectId: string) => {
  return getService(endpoint + '/select', { projectId });
};

export const getDocDetailApi = (docId: string): Promise<IDoc> => {
  return getService(`${endpoint}/detail/${docId}`);
};

export const getDocMemberApi = (
  docId: string
): Promise<Array<{ id_member: string; name: string }>> => {
  return getService(`${endpoint}/member/${docId}`);
};

export const addDocMemberApi = (
  docId: string,
  userId: string
): Promise<Array<{ id_member: string; name: string }>> => {
  return postService(`${endpoint}/member`, { docId, userId });
};

export const getListTaskInDocApi = (docId: string): Promise<ITaskRes[]> => {
  return getService(`${endpoint}/tasks/${docId}`);
};

export const createDocApi = (req: ICreateDocReq) => {
  return postService(endpoint, req);
};

export const getDocHistoryApi = (docId: string): Promise<IDocHistory[]> => {
  return getService(`${endpoint}/history/${docId}`);
};

export const editDocApi = (req: IEditDocReq) => {
  return putService(endpoint, req);
};
