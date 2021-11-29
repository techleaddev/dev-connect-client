import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import { useAppSelector } from 'src/hooks/useAppSelector';
import { getChatFromDocApi, getMyChatsApi } from 'src/services/chat/api';
import { IConversationInfo } from 'src/services/chat/types';
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
  const projectId = useAppSelector((state) => state.project.info?._id) || '';

  const state = useLocation().state as LocationState;

  const handleUser = (conversation: IConversationInfo) => {
    setConversation(conversation);
  };

  const getMyListChat = useCallback(() => {
    getMyChatsApi(projectId).then((res) => {
      setListChat(res);
      if (!conversation.id) {
        setConversation(res[0]);
      }
    });
  }, [conversation.id, projectId]);

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

  return (
    <ConversationsWrapper id="cs-chatroom">
      <UsersList
        users={listChat || []}
        handleUser={handleUser}
        conversationId={conversation.id}
      />
      <Conversations conversation={conversation} />
    </ConversationsWrapper>
  );
};

export default Conversation;
