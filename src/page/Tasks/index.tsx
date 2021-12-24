import moment from 'moment';
import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import Box from 'src/components/Base/Box';
import IconHover from 'src/components/Base/IconHover';
import HeaderTool from 'src/components/Common/HeaderTool';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { addSnackBar, createAppErr } from 'src/services/app';
import { getDocSelectService } from 'src/services/doc';
import { deleteTaskApi, getListTaskApi } from 'src/services/tasks/api';
import { ITaskRes } from 'src/services/tasks/types';
import AddTaskModal from './components/AddTaskModal';
import { ReactComponent as EditIcon } from 'src/assets/icons/edit.svg';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash.svg';

import { TaskScreenSwapper } from './style';
import { uniqueId } from 'lodash';
import Modal from 'src/components/Base/Modal';
import DetailTaskModal from './components/DetailTaskModal';
import { getListTaskInDocApi } from 'src/services/doc/api';

interface IProps {
  showHeader?: boolean;
  docId?: string;
}
const TaskScreen: FunctionComponent<IProps> = ({
  showHeader = true,
  docId,
}) => {
  const projectId = useAppSelector((state) => state.app.projectId);
  const [isShowAdd, setIsShowAdd] = useState(false);
  const [listTask, setListTask] = useState<ITaskRes[]>([]);
  const [editId, setEditId] = useState('');
  const [showDetail, setShowDetail] = useState({
    isShow: false,
    id: '',
  });
  const [deleteTask, setDeleteTask] = useState({
    isShow: false,
    id: '',
  });
  const dispatch = useAppDispatch();
  const getListTask = useCallback(async () => {
    try {
      if (docId) {
        const result = await getListTaskInDocApi(docId);
        setListTask(result);
      } else {
        const result = await getListTaskApi(projectId);
        setListTask(result.data);
      }
    } catch (error) {
      dispatch(
        createAppErr({
          title: error as string,
        })
      );
    }
  }, [dispatch, docId, projectId]);

  useEffect(() => {
    dispatch(getDocSelectService({ projectId }));
    getListTask();
  }, [dispatch, getListTask, projectId]);

  const addTaskSuccess = () => {
    getListTask();
    setEditId('');
  };

  const onOpenEdit = (id: string) => {
    setIsShowAdd(true);
    setEditId(id);
  };

  const onDeleteTask = async () => {
    try {
      await deleteTaskApi(deleteTask.id);
      getListTask();
      dispatch(
        addSnackBar({ type: 'success', message: 'Xóa task thành công' })
      );
    } catch (error) {
      dispatch(addSnackBar({ type: 'error', message: 'Xóa task thất bại' }));
    } finally {
      setDeleteTask({ isShow: false, id: '' });
    }
  };

  const onViewDetail = (id: string) => {
    setShowDetail({
      isShow: true,
      id: id,
    });
  };

  return (
    <TaskScreenSwapper>
      {showHeader && (
        <HeaderTool
          handleAddNew={() => {
            setIsShowAdd(true);
            setEditId('');
          }}
        />
      )}
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
          <Box
            key={`listTask_${item._id}`}
            className="taskListItem_box"
            onClickBox={() => onViewDetail(item._id)}
          >
            <div
              className="taskListItem"
              style={{ borderLeftColor: item.status.color }}
            >
              <i>#{item._id.slice(-5)}</i>
              <b>{item.title}</b>
              <p>
                {item.assignee.first_name} {item.assignee.last_name}
              </p>
              <p>{item.unitId.title}</p>
              <div className="listTags">
                {item.tags.map((tag) => (
                  <i className="tag" key={uniqueId('tg')}>
                    {tag.title}
                  </i>
                ))}
              </div>
              <p>{item.description}</p>
              <p>{moment(item.deadline).format('DD/MM/YY')}</p>
              <div className="editView">
                <IconHover onClick={() => onOpenEdit(item._id)}>
                  <EditIcon />
                </IconHover>
                <IconHover
                  onClick={() => setDeleteTask({ isShow: true, id: item._id })}
                >
                  <TrashIcon />
                </IconHover>
              </div>
            </div>
          </Box>
        ))}
      <AddTaskModal
        isShow={isShowAdd}
        editId={editId}
        onClose={() => {
          setIsShowAdd(false);
          setEditId('');
        }}
        addTaskSuccess={addTaskSuccess}
      />
      <Modal
        isShow={deleteTask.isShow}
        title={`Xoá task`}
        closeBtn="Close"
        onClose={() => setDeleteTask({ isShow: false, id: '' })}
        submitBtn="Xóa"
        onSubmit={onDeleteTask}
      >
        Bạn có chắc muốn xóa task #{deleteTask.id.slice(-5)}
      </Modal>

      <DetailTaskModal
        isShow={showDetail.isShow}
        taskId={showDetail.id}
        onClose={() => setShowDetail({ id: '', isShow: false })}
      />
    </TaskScreenSwapper>
  );
};

export default TaskScreen;
