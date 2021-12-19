import { uniqueId } from 'lodash';
import moment from 'moment';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Box, { BoxWithHeader } from 'src/components/Base/Box';
import Button from 'src/components/Base/Button';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { SELECT_OPTION } from 'src/lib/constants/options';
import { addSnackBar } from 'src/services/app';
import { IDocSelectOption } from 'src/services/doc/types';
import { editTaskApi, getTaskDetailApi } from 'src/services/tasks/api';
import { ITask } from 'src/services/tasks/types';
import { DetailTabWrapper } from '../style';
import DetailForm, { DetailTaskDataKey, IDetailTaskData } from './DetailForm';

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

interface IProps {
  editId: string;
}

const DetailTab: FunctionComponent<IProps> = ({ editId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const docOption = useAppSelector((state) => state.doc.docSelect);
  const listTag = useAppSelector((state) => state.project.tags);
  const statusList = useAppSelector((state) => state.project.statusList);
  const dispatch = useAppDispatch();
  //   const dispatch = useAppDispatch();
  const tagsOption: SELECT_OPTION[] = useMemo(() => {
    return listTag.map((item) => ({ value: item._id, label: item.title }));
  }, [listTag]);

  const statusOption: SELECT_OPTION[] = useMemo(() => {
    return statusList.map((item) => ({ value: item._id, label: item.name }));
  }, [statusList]);

  const [state, setState] = useState<IDetailTaskData>({ ...initState });

  const handleChangeForm = (event: ChangeEvent<any>) => {
    setState((pre) => ({
      ...pre,
      [event.target.name as DetailTaskDataKey]: event.target.value,
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

  const onEditTask = async () => {
    try {
      await editTaskApi(editId, {
        unitId: state.unit?.value || '',
        ...taskData,
      });
      setIsEdit(false);
      dispatch(addSnackBar({ type: 'success', message: 'Edit task success' }));
    } catch (error) {
      dispatch(addSnackBar({ type: 'error', message: 'Edit task error' }));
    }
  };

  const handleEdit = () => {
    if (isEdit) {
      onEditTask();
    } else {
      setIsEdit(true);
    }
  };

  return (
    <DetailTabWrapper>
      <Button
        title={isEdit ? 'Save' : 'Edit'}
        onClick={handleEdit}
        className="dt_edit__btn"
      />
      {!isEdit ? (
        <>
          <Box className="dt_element">
            <h4>Title: </h4> <span>{state.title}</span>
            <h4>API: </h4> <span>{state.unit?.label}</span>
            <h4>Assignee: </h4> <span>{state.assignee?.label}</span>
            <h4>Assignee: </h4> <span>{state.assignee?.label}</span>
            <h4>Tag: </h4>
            <p>
              {state.tags?.map((item) => (
                <i className="tag" key={uniqueId('tg')}>
                  {item.label}
                </i>
              ))}
            </p>
          </Box>
          <BoxWithHeader title="Description">
            <p>{state.description}</p>
          </BoxWithHeader>
        </>
      ) : (
        <DetailForm
          data={state}
          docOption={docOption}
          handleChangeApi={handleChangeApi}
          handleChangeAssignee={handleChangeAssignee}
          handleChangeForm={handleChangeForm}
          handleChangeStatus={handleChangeStatus}
          handleChangeTag={handleChangeTag}
          onChangeDeadline={(value) =>
            setState((pre) => ({ ...pre, deadline: value }))
          }
          statusOption={statusOption}
          tagsOption={tagsOption}
        />
      )}
    </DetailTabWrapper>
  );
};

export default DetailTab;
