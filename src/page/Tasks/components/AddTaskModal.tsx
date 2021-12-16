import moment from 'moment';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import DatePicker from 'src/components/Base/DatePicker';
import { InputNormal } from 'src/components/Base/Input';
import Modal from 'src/components/Base/Modal';
import { SelectFieldNormal } from 'src/components/Base/SelectField';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { createAppErr } from 'src/services/app';
import { IDocSelectOption } from 'src/services/doc/types';
import {
  createTaskApi,
  editTaskApi,
  getTaskDetailApi,
} from 'src/services/tasks/api';
import { ITask } from 'src/services/tasks/types';
import { AddTaskModalWrapper } from '../style';
interface IProps {
  isShow: boolean;
  onClose(): void;
  addTaskSuccess(): void;
  editId?: string;
}
interface IState {
  unit?: IDocSelectOption;
  title: string;
  description: string;
  tags?: SELECT_OPTION[];
  assignee?: SELECT_OPTION;
  deadline?: Date;
  status?: SELECT_OPTION;
}
type StateKey = keyof IState;
const initState = {
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
  tags: [],
  status: {
    label: '',
    value: '',
  },
};

const AddTaskModal: FunctionComponent<IProps> = ({
  isShow,
  onClose,
  addTaskSuccess,
  editId,
}) => {
  const docOption = useAppSelector((state) => state.doc.docSelect);
  const listTag = useAppSelector((state) => state.project.tags);
  const statusList = useAppSelector((state) => state.project.statusList);
  const dispatch = useAppDispatch();
  const tagsOption: SELECT_OPTION[] = useMemo(() => {
    return listTag.map((item) => ({ value: item._id, label: item.title }));
  }, [listTag]);

  const statusOption: SELECT_OPTION[] = useMemo(() => {
    return statusList.map((item) => ({ value: item._id, label: item.name }));
  }, [statusList]);

  const [state, setState] = useState<IState>({ ...initState });

  const taskData: Omit<ITask, '_id' | 'unitId'> = useMemo(() => {
    return {
      title: state.title,
      description: state.description,
      assignee: state?.assignee?.value || '',
      status: state?.status?.value || '',
      tags: state.tags?.map((item) => item.value) || [],
      deadline: state.deadline,
    };
  }, [state]);
  const isDisableSubmit = useMemo(
    () => Object.values(taskData).some((item) => !item) || !state?.unit?.value,
    [state.unit?.value, taskData]
  );
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
  const handleChangeStatus = (value: SELECT_OPTION) => {
    setState((pre) => ({ ...pre, status: value }));
  };
  const handleChangeTag = (value: SELECT_OPTION[]) => {
    setState((pre) => ({ ...pre, tags: value }));
  };
  const handleClose = () => {
    setState({ ...initState });
    onClose();
  };
  const onAddTask = async () => {
    try {
      if (editId) {
        await editTaskApi(editId, {
          unitId: state.unit?.value || '',
          ...taskData,
        });
      } else {
        await createTaskApi(state.unit?.value || '', taskData);
      }

      addTaskSuccess();
    } catch (error) {
      dispatch(
        createAppErr({
          title: error as string,
        })
      );
    } finally {
      handleClose();
    }
  };
  const getTaskDetail = useCallback(async () => {
    const data = await getTaskDetailApi(editId || '');

    const status = statusOption.find((item) => item.value === data.status);
    const unit = docOption.find((item) => item.value === data.unitId);
    const tags = tagsOption.filter((item) => data.tags.includes(item.value));
    const assignee = unit?.members.find((item) => item.value === data.assignee);
    setState({
      title: data.title,
      description: data.description,
      deadline: moment(data.deadline).toDate(),
      status,
      unit,
      assignee,
      tags,
    });
  }, [docOption, editId, statusOption, tagsOption]);

  useEffect(() => {
    if (editId) {
      getTaskDetail();
    }
  }, [editId, getTaskDetail]);
  return (
    <Modal
      isShow={isShow}
      onClose={handleClose}
      closeBtn="Close"
      title={editId ? 'Edit task' : 'Add task'}
      submitBtn={editId ? 'Edit' : 'Add'}
      onSubmit={onAddTask}
      disableSubmit={isDisableSubmit}
    >
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
            options={state.unit?.members}
            onChange={handleChangeAssignee}
          />
          <SelectFieldNormal
            name="status"
            title="Status"
            options={statusOption}
            value={state.status}
            onChange={handleChangeStatus}
          />
          <DatePicker
            title="Deadline"
            value={state.deadline}
            onChange={(date: Date) =>
              setState((pre) => ({ ...pre, deadline: date }))
            }
          />
        </div>
        <SelectFieldNormal
          name="tag"
          title="Tags"
          value={state.tags || []}
          options={tagsOption}
          onChange={handleChangeTag}
          closeMenuOnSelect={false}
          isMulti
        />
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
