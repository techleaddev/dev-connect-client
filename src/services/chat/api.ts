import { getService, postService } from 'src/lib/helpers/connectApi';
import { IConversation, ICreateChatroomReq, IGetChatFromDocRes } from './types';

const endpoint = '/chat';

export function createChatApi(request: ICreateChatroomReq): Promise<IConversation> {
  return postService(`${endpoint}/group`, request);
}

export const getMyChatsApi = (projectId: string) => {
  return getService(endpoint, { projectId });
};

export function getChatContentApi(id: string): Promise<IConversation> {
  return getService(`${endpoint}/${id}`);
}

export const sendMessApi = (conversationId: string, text: string) => {
  return postService(endpoint, { conversationId, text });
};

export function getChatFromDocApi(docId: string):Promise<IGetChatFromDocRes>{
  return getService(`${endpoint}/unit/${docId}`);
}