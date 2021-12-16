import { deleteService, getService, postService, putService } from 'src/lib/helpers/connectApi';
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

export function getTaskDetailApi(taskId: string): Promise<ITask> {
  return getService(`${endpoint}/${taskId}`);
}

export function deleteTaskApi(taskId: string): Promise<ITask> {
  return deleteService(`${endpoint}/${taskId}`);
}

export function editTaskApi(
  id: string,
  taskData: Omit<ITask, '_id'>
) {
  return putService(endpoint, { id, ...taskData });
}