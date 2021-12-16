import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Box from 'src/components/Base/Box';
import HeaderTool from 'src/components/Common/HeaderTool';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { formatTimeMess } from 'src/lib/helpers';
import { getDocSelectService } from 'src/services/doc';
import { getListTaskApi } from 'src/services/tasks/api';
import { ITaskRes } from 'src/services/tasks/types';
import AddTaskModal from './components/AddTaskModal';
import { TaskScreenSwapper } from './style';

interface IProps {
  showHeader?: boolean;
}
const TaskScreen: FunctionComponent<IProps> = ({ showHeader = true }) => {
  const projectId = useAppSelector((state) => state.app.projectId);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [listTask, setListTask] = useState<ITaskRes[]>([]);
  const dispatch = useAppDispatch();
  const getListTask = useCallback(async () => {
    try {
      const result = await getListTaskApi(projectId);
      setListTask(result.data);
    } catch (error) {}
  }, [projectId]);

  useEffect(() => {
    dispatch(getDocSelectService({ projectId }));
    getListTask();
  }, [dispatch, getListTask, projectId]);

  return (
    <TaskScreenSwapper>
      {showHeader && <HeaderTool handleAddNew={() => setIsShowAdd(true)} />}
      <Box className="taskListItem_box no_border">
        <div className="taskListItem">
          <p>#ID</p>
          <p>Tiêu đề</p>
          <p>Người phụ trách</p>
          <p>Danh mục</p>
          <p>Thẻ</p>
          <p>Mô tả</p>
          <p>Thời Hạn</p>
        </div>
      </Box>
      {!!listTask.length &&
        listTask.map((item) => (
          <Box key={`listTask_${item._id}`} className="taskListItem_box">
            <div
              className="taskListItem"
              style={{ borderLeftColor: item.status.color }}
            >
              <i>#{item._id.slice(-5)}</i>
              <p>{item.title}</p>
              <p>
                {item.assignee.first_name} {item.assignee.last_name}
              </p>
              <p>{item.unitId.title}</p>
              <p>
                {item.tags.map((tag) => (
                  <i className="tag">{tag.title}</i>
                ))}
              </p>
              <p>{item.description}</p>
              <p>{formatTimeMess(item.deadline)}</p>
            </div>
          </Box>
        ))}
      <AddTaskModal isShow={isShowAdd} onClose={() => setIsShowAdd(false)} />
    </TaskScreenSwapper>
  );
};

export default TaskScreen;
