import IconHover from 'src/components/Base/IconHover';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash.svg';
import { IMember } from 'src/services/project/types';
import { FunctionComponent } from 'react';
import { ListMemberWrapper } from './style';

interface IProps {
  members: IMember[];
  handleShowAdd(): void;
  handleDelete(id: string): void;
}

const ListMember: FunctionComponent<IProps> = ({
  members,
  handleShowAdd,
  handleDelete,
}) => {
  return (
    <ListMemberWrapper
      title="List member"
      btnTitle="Thêm thành viên"
      handleClickBtn={handleShowAdd}
      className="member__element"
    >
      {members?.map((item) => (
        <div className="member__element__item" key={`member__${item.member_id}`}>
          <span>{item.name}</span>
          <IconHover>
            <TrashIcon className="icon" onClick={() => handleDelete(item.member_id)} />
          </IconHover>
        </div>
      ))}
    </ListMemberWrapper>
  );
};

export default ListMember;
