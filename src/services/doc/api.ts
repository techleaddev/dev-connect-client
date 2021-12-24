import {
  getService,
  postService,
  putService,
} from 'src/lib/helpers/connectApi';
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
  return getService(`${endpoint}/${docId}`);
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
