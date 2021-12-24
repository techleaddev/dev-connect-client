import { uniqueId } from 'lodash';
import { FunctionComponent } from 'react';
import { ReactComponent as SearchIcon } from 'src/assets/icons/search.svg';
import { ReactComponent as ConnectIcon } from 'src/assets/icons/connect.svg';
import Skeleton from 'react-loading-skeleton';
import { IConversationInfo } from 'src/services/chat/types';
import { UserChatListWrapper } from '../style';
import Button from 'src/components/Base/Button';
interface IProps {
  users: IConversationInfo[];
  conversationId: string;
  handleUser: (i: any) => void;
  openAddChat(): void;
}
const UsersList: FunctionComponent<IProps> = ({
  users,
  conversationId,
  handleUser,
  openAddChat,
}) => {
  return (
    <UserChatListWrapper>
      <h3>CS Chat</h3>
      <div className="cs-search-bar">
        <SearchIcon />
        <input type="text" placeholder="Type to search" />
      </div>
      <div className="cs-list-user">
        {users ? (
          users?.map((i) => (
            <div
              className={`cs-one-user${
                i.id === conversationId ? ' selected' : ''
              }`}
              onClick={() => handleUser(i)}
              key={uniqueId('contact_')}
            >
              <div className="cs-avt">
                {!!i.unitId && <ConnectIcon />}
                <span>{i.name?.slice(0, 1)}</span>
                <span className="cs-avt-status"></span>
              </div>
              <div>
                <h5>{i.name}</h5>
                <p>{i.lastMess}</p>
              </div>
            </div>
          ))
        ) : (
          <Skeleton count={10} />
        )}
      </div>
      <Button title="Create conversation" onClick={openAddChat} className='addChatBtn' />
    </UserChatListWrapper>
  );
};

export default UsersList;
