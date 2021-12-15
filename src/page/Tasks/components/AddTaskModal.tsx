import { ChangeEvent, FunctionComponent, useState } from 'react';
import DatePicker from 'src/components/Base/DatePicker';
import { InputNormal } from 'src/components/Base/Input';
import Modal from 'src/components/Base/Modal';
import { SelectFieldNormal } from 'src/components/Base/SelectField';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { IDocSelectOption } from 'src/services/doc/types';
import { AddTaskModalWrapper } from '../style';
interface IProps {
  isShow: boolean;
  onClose(): void;
}
interface IState {
  unit: IDocSelectOption;
  title: string;
  description: string;
  tags?: string[];
  assignee: SELECT_OPTION;
  deadline?: Date;
  status: string;
}
type StateKey = keyof IState;

const AddTaskModal: FunctionComponent<IProps> = ({ isShow, onClose }) => {
  const docOption = useAppSelector((state) => state.doc.docSelect);
  const [state, setState] = useState<IState>({
    unit: {
      value: '',
      label: '',
      members: [],
    },
    title: '',
    description: '',
    assignee: {
      label: '',
      value: '',
    },
    status: '',
  });

  const handleChangeForm = (event: ChangeEvent<any>) => {
    setState((pre) => ({
      ...pre,
      [event.target.name as StateKey]: event.target.value,
    }));
  };

  const handleChangeApi = (value: IDocSelectOption) => {
    setState((pre) => ({
      ...pre,
      unit: value,
      assignee: {
        label: '',
        value: '',
      },
    }));
  };
  const handleChangeAssignee = (value: SELECT_OPTION) => {
    setState((pre) => ({ ...pre, assignee: value }));
  };
  return (
    <Modal isShow={isShow} onClose={onClose} closeBtn="Close" title="Add task">
      <AddTaskModalWrapper>
        <SelectFieldNormal
          title="Api"
          name="unitId"
          value={state.unit}
          options={docOption}
          onChange={handleChangeApi}
        />
        <InputNormal
          name="title"
          title="Title"
          value={state.title}
          onChange={handleChangeForm}
        />
        <div className="task_group">
          <SelectFieldNormal
            title="Assignee"
            name="assignee"
            value={state.assignee}
            options={state.unit.members}
            onChange={handleChangeAssignee}
          />
          <InputNormal
            name="status"
            title="Status"
            value={state.status}
            onChange={handleChangeForm}
          />
          <DatePicker
          title='Deadline'
            value={state.deadline}
            onChange={(date: Date) =>
              setState((pre) => ({ ...pre, deadline: date }))
            }
          />
        </div>

        <TextAreaNormal
          name="description"
          title="Description"
          value={state.description}
          onChange={handleChangeForm}
        />
      </AddTaskModalWrapper>
    </Modal>
  );
};

export default AddTaskModal;
