import { getService, postService } from 'src/lib/helpers/connectApi';
import { ICreateDocReq, IDocHistory } from './types';
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

export const createDocApi = (req: ICreateDocReq) => {
  return postService(endpoint, req);
};

export const getDocHistoryApi = (docId: string): Promise<IDocHistory[]> => {
  return getService(`${endpoint}/history/${docId}`);
};
