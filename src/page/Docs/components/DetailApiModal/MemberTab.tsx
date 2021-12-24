import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { InputNormal } from 'src/components/Base/Input';
import Modal from 'src/components/Base/Modal';
import ListMember from 'src/components/Common/ListMember';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addSnackBar } from 'src/services/app';
import { addDocMemberApi, getDocMemberApi } from 'src/services/doc/api';
import { IMember } from 'src/services/project/types';

interface IProps {
  docId: string;
}

const MemberTab: FunctionComponent<IProps> = ({ docId }) => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IMember[]>([]);
  const [isShowAddMember, setIsShowAddMember] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);
  const [addMem, setAddMem] = useState<string>('');
  const getDocMember = useCallback(async () => {
    try {
      const memberRaw = (await getDocMemberApi(docId)) || [];
      const member = memberRaw.map((item) => ({
        name: item.name,
        member_id: item.id_member,
      }));
      setState(member);
    } catch (error) {}
  }, [docId]);

  useEffect(() => {
    getDocMember();
  }, [getDocMember]);
  const onAddMember = async () => {
    try {
      // await addMember(addMem, projectInfo._id);
      await addDocMemberApi(docId, '')
      getDocMember();
      dispatch(
        addSnackBar({
          type: 'success',
          message: 'Thêm thành viên thành công',
        })
      );
    } catch (error) {
      dispatch(
        addSnackBar({ type: 'error', message: 'Thêm thành viên thất bại' })
      );
    } finally {
      setIsShowAddMember(false);
      setAddMem('');
    }
  };
  const handleChangeAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setAddMem(e.target.value);
  };
  const onDelete = () => {};
  return (
    <div>
      <ListMember
        members={state}
        handleShowAdd={() => setIsShowAddMember(true)}
        handleDelete={() => null}
      />
      <Modal
        isShow={isShowAddMember}
        title="Thêm thành viên"
        closeBtn="Close"
        onClose={() => setIsShowAddMember(false)}
        submitBtn="Add"
        onSubmit={onAddMember}
      >
        <InputNormal title="Email" onChange={handleChangeAdd} value={addMem} />
      </Modal>
      <Modal
        isShow={isShowDelete}
        title={`Xoá member`}
        closeBtn="Close"
        onClose={() => setIsShowDelete(false)}
        submitBtn="Xóa"
        onSubmit={onDelete}
      >
        Bạn có chắc muốn xóa
      </Modal>
    </div>
  );
};

export default MemberTab;
