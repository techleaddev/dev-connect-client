import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  createChatApi,
  getChatFromDocApi,
  getMyChatsApi,
} from 'src/services/chat/api';
import { IConversationInfo } from 'src/services/chat/types';
import AddNewChat, { IDataCreate } from './components/AddNewChat';
import Conversations from './components/Conversations';
import UsersList from './components/Users';
import { ConversationsWrapper } from './style';
type LocationState = {
  docId: string;
};
const Conversation = () => {
  const [listChat, setListChat] = useState<IConversationInfo[]>();
  const [conversation, setConversation] = useState<IConversationInfo>({
    id: '',
    name: '',
    lastMess: '',
  });
  const [isShowAddChat, setIsShowAddChat] = useState(false);

  const projectId = useAppSelector((state) => state.project.info?._id) || '';

  const state = useLocation().state as LocationState;

  const handleUser = (conversation: IConversationInfo) => {
    setConversation(conversation);
  };

  const getMyListChat = useCallback(() => {
    getMyChatsApi(projectId).then((res) => {
      setListChat(res);
      if (!conversation.id && res[0]) {
        setConversation(res[0]);
      }
    });
  }, [conversation, projectId]);

  const getChatFromDoc = async (docId: string) => {
    try {
      const data = await getChatFromDocApi(docId);
      setListChat(data.listChat);
      setConversation(data.newChat);
    } catch (error) {}
  };

  useEffect(() => {
    if (state?.docId) {
      getChatFromDoc(state?.docId);
      state.docId = '';
    } else {
      if (projectId) {
        getMyListChat();
      }
    }
  }, [getMyListChat, projectId, state]);

  useEffect(() => {
    const objDiv = document.getElementById('chat-box-contain');
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }, []);

  const submitCreate = async (data: IDataCreate) => {
    try {
      const listMemId = data.members.map((item) => item.value);
      await createChatApi({
        projectId: projectId,
        all: data.chatAll,
        name: data.name,
        member: listMemId,
      });
    } catch (error) {
      
    }
  };

  return (
    <ConversationsWrapper id="cs-chatroom">
      <UsersList
        users={listChat || []}
        handleUser={handleUser}
        conversationId={conversation.id}
        openAddChat={() => setIsShowAddChat(true)}
      />
      <Conversations conversation={conversation} />

      <AddNewChat
        isShow={isShowAddChat}
        submitCreate={submitCreate}
        onClose={() => setIsShowAddChat(false)}
      />
    </ConversationsWrapper>
  );
};

export default Conversation;
