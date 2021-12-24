import IconHover from 'src/components/Base/IconHover';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash.svg';
import { IMember } from 'src/services/project/types';
import { FunctionComponent, useMemo } from 'react';
import { ListMemberWrapper } from './style';
import { useAppSelector } from 'src/hooks/useAppSelector';

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
  const adminId = useAppSelector((state) => state.user._id);
  
  const isShowDelete = useMemo(() => {
    const hasMe = members.find((item) => item.member_id === adminId);
    return !!hasMe && members.length > 1;
  }, [adminId, members]);

  return (
    <ListMemberWrapper
      title="List member"
      btnTitle="Thêm thành viên"
      handleClickBtn={handleShowAdd}
      className="member__element"
    >
      {members?.map((item) => (
        <div
          className="member__element__item"
          key={`member__${item.member_id}`}
        >
          <span>{item.name}</span>
          {isShowDelete && (
            <IconHover onClick={() => handleDelete(item.member_id)}>
              <TrashIcon className="icon" />
            </IconHover>
          )}
        </div>
      ))}
    </ListMemberWrapper>
  );
};

export default ListMember;
