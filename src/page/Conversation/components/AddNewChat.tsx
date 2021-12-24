import { FunctionComponent, useState } from 'react';
import Switch from 'react-switch';
import { InputNormal } from 'src/components/Base/Input';
import Modal from 'src/components/Base/Modal';
import { SelectFieldNormal } from 'src/components/Base/SelectField';
import useMemberOptions from 'src/hooks/project/useMemberOptions';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { AddNewChatWrapper } from '../style';

export interface IDataCreate {
  name: string;
  members: SELECT_OPTION[];
  chatAll: boolean;
}
interface IProps {
  isShow: boolean;
  onClose(): void;
  submitCreate(body: IDataCreate): void;
}

const AddNewChat: FunctionComponent<IProps> = ({
  isShow,
  onClose,
  submitCreate,
}) => {
  const memberOptions = useMemberOptions();

  const [data, setData] = useState<IDataCreate>({
    name: '',
    chatAll: false,
    members: [],
  });

  const handleChangeMember = (value: SELECT_OPTION[]) => {
    setData({ ...data, members: value });
  };

  const onSubmit = () => {
    submitCreate(data);
  };

  return (
    <AddNewChatWrapper>
      <Modal
        isShow={isShow}
        closeBtn="Close"
        onClose={onClose}
        title="Create a conversation"
        submitBtn="Create"
        onSubmit={onSubmit}
      >
        <InputNormal
          value={data.name}
          title="name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <div className='switch-chatAll'>
          <label> Chat toàn bộ </label>
          <Switch
            checked={data.chatAll}
            onChange={(checked) => setData({ ...data, chatAll: checked })}
            checkedIcon={false}
            uncheckedIcon={false}
          />
        </div>

        {!data.chatAll && (
          <SelectFieldNormal
            name="members"
            placeholder={'members'}
            title="members"
            value={data.members}
            options={memberOptions}
            rules={{ required: true }}
            closeMenuOnSelect={false}
            isMulti
            onChange={handleChangeMember}
          />
        )}
      </Modal>
    </AddNewChatWrapper>
  );
};

export default AddNewChat;
