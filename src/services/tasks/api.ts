import { getService, postService } from 'src/lib/helpers/connectApi';
import { ITask } from './types';
const endpoint = '/tasks';

export function createTaskApi(
  unitId: string,
  taskData: Omit<ITask, '_id' | 'unitId'>
) {
  return postService(endpoint, { unitId, taskData });
}

export function getListTaskApi(
  projectId: string,
  page?: number,
  searchKey?: string
) {
  return getService(endpoint, { projectId, page, searchKey });
}
