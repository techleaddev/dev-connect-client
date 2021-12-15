import {
  getService,
  postService,
  putService,
} from 'src/lib/helpers/connectApi';
import {
  ICreateProjectReq,
  IProjectInfoRes,
  IProjectsListRes,
  ITagTask,
  ITaskStatus,
} from './types';
const endpoint = '/project';
export const createProjectApi = (req: ICreateProjectReq) => {
  return postService(endpoint, req);
};

export const editProjectApi = (
  projectId: string,
  data: { name: string; description: string; readme: string }
) => {
  return putService(`${endpoint}/${projectId}`, data);
};

export function getProjectsApi(): Promise<IProjectsListRes[]> {
  return getService(endpoint);
}

export function getInfoProjectApi(id: string): Promise<IProjectInfoRes> {
  return getService(`${endpoint}/${id}`);
}

export function getStatusListApi(projectId: string): Promise<ITaskStatus[]> {
  return getService(`${endpoint}/status/${projectId}`);
}
export function getTagsApi(projectId: string): Promise<ITagTask[]> {
  return getService(`${endpoint}/tag/${projectId}`);
}
export function getProjectMemberApi(id: string) {
  return getService(`${endpoint}/members/${id}`);
}

export function addMember(email: string, projectId: string) {
  return putService(endpoint + '/addMember', { email, projectId });
}

export function addStatusListApi(
  projectId: string,
  statusData: Omit<ITaskStatus, 'projectId' | '_id'>
): Promise<ITaskStatus> {
  return postService(`${endpoint}/status`, { projectId, statusData });
}
export function addTagsApi(
  projectId: string,
  title: string
): Promise<ITagTask> {
  return postService(`${endpoint}/tag`, { projectId, title });
}
