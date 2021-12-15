import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import HeaderTool from 'src/components/Common/HeaderTool';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { getDocSelectService } from 'src/services/doc';
import { getListTaskApi } from 'src/services/tasks/api';
import { ITask } from 'src/services/tasks/types';
import AddTaskModal from './components/AddTaskModal';
import { TaskScreenSwapper } from './style';

const TaskScreen: FunctionComponent = () => {
  const projectId = useAppSelector((state) => state.app.projectId);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [listTask, setListTask] = useState<ITask[]>([]);
  const dispatch = useAppDispatch();
  const getListTask = useCallback(async () => {
    try {
      const result = await getListTaskApi(projectId);
      setListTask(result);
    } catch (error) {}
  }, [projectId]);

  useEffect(() => {
    dispatch(getDocSelectService({ projectId }));
    getListTask();
  }, [dispatch, getListTask, projectId]);

  return (
    <TaskScreenSwapper>
      <HeaderTool handleAddNew={() => setIsShowAdd(true)} />
      {/* {listTask.map((i) => (
        <h1>{i.title}</h1>
      ))} */}
      {JSON.stringify(listTask)}
      <AddTaskModal isShow={isShowAdd} onClose={() => setIsShowAdd(false)} />
    </TaskScreenSwapper>
  );
};

export default TaskScreen;
