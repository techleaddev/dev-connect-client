import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'src/components/Base/Modal';
import { SelectFieldNormal } from 'src/components/Base/SelectField';
import ListMember from 'src/components/Common/ListMember';
import useMemberOptions from 'src/hooks/project/useMemberOptions';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { DocTranslateKeyType } from 'src/lib/translations/vn/doc';
import { addSnackBar } from 'src/services/app';
import {
  addDocMemberApi,
  deleteDocMemberApi,
  getDocMemberApi,
} from 'src/services/doc/api';
import { IMember } from 'src/services/project/types';

interface IProps {
  docId: string;
}

const MemberTab: FunctionComponent<IProps> = ({ docId }) => {
  const dispatch = useAppDispatch();
  const memberOptions = useMemberOptions();
  const { t } = useTranslation();
  const words = useCallback(
    (title: DocTranslateKeyType) => t(`docTranslate.${title}`),
    [t]
  );

  const [state, setState] = useState<IMember[]>([]);
  const [isShowAddMember, setIsShowAddMember] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [addMem, setAddMem] = useState<SELECT_OPTION[]>([]);

  const getDocMember = useCallback(async () => {
    try {
      const memberRaw = (await getDocMemberApi(docId)) || [];
      const member = memberRaw.map((item) => ({
        name: item.name,
        member_id: item.id_member,
      }));
      setState(member);
      const options: SELECT_OPTION[] = memberRaw.map((item) => ({
        label: item.name,
        value: item.id_member,
      }));
      setAddMem(options);
    } catch (error) {}
  }, [docId]);

  useEffect(() => {
    getDocMember();
  }, [getDocMember]);
  const onAddMember = async () => {
    try {
      const listUserId = addMem.map((item) => item.value);
      await addDocMemberApi(docId, listUserId);
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
      setAddMem([]);
    }
  };

  const handleChangeAdd = (value: SELECT_OPTION[]) => {
    setAddMem(value);
  };

  const onDelete = async () => {
    try {
      const newMems = await deleteDocMemberApi(docId, deleteId);
      dispatch(
        addSnackBar({
          type: 'success',
          message: 'Xóa thành viên thành công',
        })
      );
      const member = newMems.map((item) => ({
        name: item.name,
        member_id: item.id_member,
      }));
      setState(member);
      const options: SELECT_OPTION[] = newMems.map((item) => ({
        label: item.name,
        value: item.id_member,
      }));
      setAddMem(options);
    } catch (error) {
      dispatch(
        addSnackBar({ type: 'error', message: 'Xóa thành viên thất bại' })
      );
    } finally {
      setDeleteId('');
    }
  };

  return (
    <div>
      <ListMember
        members={state}
        handleShowAdd={() => setIsShowAddMember(true)}
        handleDelete={(id) => setDeleteId(id)}
      />
      <Modal
        isShow={isShowAddMember}
        title="Thêm thành viên"
        closeBtn="Close"
        onClose={() => setIsShowAddMember(false)}
        submitBtn="Add"
        onSubmit={onAddMember}
        disableSubmit={!addMem.length}
      >
        <SelectFieldNormal
          name="members"
          placeholder={words('members')}
          title={words('members')}
          value={addMem}
          options={memberOptions}
          rules={{ required: true }}
          closeMenuOnSelect={false}
          isMulti
          onChange={handleChangeAdd}
        />
      </Modal>
      <Modal
        isShow={!!deleteId}
        title={`Xoá member`}
        closeBtn="Close"
        onClose={() => setDeleteId('')}
        submitBtn="Xóa"
        onSubmit={onDelete}
      >
        Bạn có chắc muốn xóa
      </Modal>
    </div>
  );
};

export default MemberTab;
