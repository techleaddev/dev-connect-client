import { ChangeEvent, useEffect, useState } from 'react';
import { BoxWithHeader } from 'src/components/Base/Box';
import { InputNormal } from 'src/components/Base/Input';
import Modal from 'src/components/Base/Modal';
import { useAppSelector } from 'src/hooks/useAppSelector';
import {
  addMember,
  addStatusListApi,
  addTagsApi,
  editProjectApi,
} from 'src/services/project/api';
import { DashboardWrapper } from './style';
import { ITaskStatus } from 'src/services/project/types';
import ColorPicker from 'src/components/Base/ColorPicker';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addSnackBar } from 'src/services/app';
import {
  getInfoService,
  getStatusListService,
  getTagsService,
} from 'src/services/project';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { PieChart, Pie, Tooltip } from 'recharts';
const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const projectInfo = useAppSelector((state) => state.project.info);
  const statusList = useAppSelector((state) => state.project.statusList);
  const tags = useAppSelector((state) => state.project.tags);

  const [projectState, setProjectState] = useState({
    name: '',
    description: '',
    readme: '',
  });
  const [addMem, setAddMem] = useState<string>('');
  const [addStatus, setAddStatus] = useState<
    Omit<ITaskStatus, 'projectId' | '_id'>
  >({
    name: '',
    description: '',
    color: '',
  });
  const [addTagTitle, setAddTagTitle] = useState('');
  const [isShowAddMember, setIsShowAddMember] = useState(false);
  const [isShowAddStatus, setIsShowAddStatus] = useState(false);
  const [isShowAddTag, setIsShowAddTag] = useState(false);
  const [isOpenEditProject, setIsOpenEditProject] = useState(false);
  const handleChangeAdd = (e: ChangeEvent<HTMLInputElement>) => {
    setAddMem(e.target.value);
  };
  const onChangeStatusForm = (e: ChangeEvent<HTMLInputElement>) => {
    setAddStatus((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };
  const onAddMember = async () => {
    try {
      if (projectInfo?._id) {
        await addMember(addMem, projectInfo._id);

        dispatch(
          addSnackBar({
            type: 'success',
            message: 'Thêm thành viên thành công',
          })
        );
      }
    } catch (error) {
      dispatch(
        addSnackBar({ type: 'error', message: 'Thêm thành viên thất bại' })
      );
    } finally {
      setIsShowAddMember(false);
      setAddMem('');
    }
  };
  const onAddStatus = async () => {
    try {
      if (projectInfo?._id) {
        await addStatusListApi(projectInfo?._id, addStatus);
        dispatch(getStatusListService({ projectId: projectInfo._id }));

        dispatch(
          addSnackBar({ type: 'success', message: 'Thêm status thành công' })
        );
      }
    } catch (error) {
      dispatch(addSnackBar({ type: 'error', message: 'Thêm status thất bại' }));
    } finally {
      setIsShowAddStatus(false);
      setAddStatus({ name: '', description: '', color: '' });
    }
  };

  const onAddTag = async () => {
    try {
      if (projectInfo?._id) {
        await addTagsApi(projectInfo?._id, addTagTitle);
        dispatch(getTagsService({ projectId: projectInfo._id }));
        dispatch(
          addSnackBar({ type: 'success', message: 'Thêm tag thành công' })
        );
      }
    } catch (error) {
      dispatch(addSnackBar({ type: 'error', message: 'Thêm tag thất bại' }));
    } finally {
      setIsShowAddTag(false);
      setAddTagTitle('');
    }
  };

  const handleEditProject = async () => {
    if (!isOpenEditProject) {
      setIsOpenEditProject(true);
    } else {
      if (projectInfo?._id) {
        try {
          await editProjectApi(projectInfo?._id, { ...projectState });
          dispatch(getInfoService({ id: projectInfo._id }));
          dispatch(
            addSnackBar({ type: 'success', message: 'Sủa đổi thành công' })
          );
        } catch (error) {
          dispatch(addSnackBar({ type: 'error', message: 'Sủa đổi thất bại' }));
        } finally {
          setIsOpenEditProject(false);
        }
      }
    }
  };

  const handleChangeProjectInfo = (e: ChangeEvent<any>) => {
    setProjectState((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setProjectState({
      name: projectInfo?.name || '',
      description: projectInfo?.description || '',
      readme: projectInfo?.readme || '',
    });
  }, [projectInfo?.description, projectInfo?.name, projectInfo?.readme]);

  return (
    <DashboardWrapper>
      <BoxWithHeader
        title="Mô tả dự án"
        btnTitle={isOpenEditProject ? 'Lưu thay đổi' : 'Sửa mô tả'}
        handleClickBtn={handleEditProject}
        className="__description"
      >
        <InputNormal
          title="Tên dự án"
          value={projectState?.name || ''}
          name="name"
          onChange={handleChangeProjectInfo}
          disable={!isOpenEditProject}
        />
        <TextAreaNormal
          title="Mô tả dự án"
          value={projectState?.description || ''}
          onChange={handleChangeProjectInfo}
          name="description"
          disable={!isOpenEditProject}
        />
        <TextAreaNormal
          title="Wiki dự án"
          name="readme"
          value={projectState?.readme || ''}
          onChange={handleChangeProjectInfo}
          disable={!isOpenEditProject}
        />
      </BoxWithHeader>

      <div className="dashboardSetting">
        <BoxWithHeader
          title="List member"
          btnTitle="Thêm thành viên"
          handleClickBtn={() => setIsShowAddMember(true)}
          className="__element"
        >
          <ul>
            {projectInfo?.members?.map((item) => (
              <li key={item.member_id}>
                <h3>{item.name}</h3>
              </li>
            ))}
          </ul>
        </BoxWithHeader>
        <BoxWithHeader
          title="List Status"
          btnTitle="Thêm status"
          handleClickBtn={() => setIsShowAddStatus(true)}
          className="__element"
        >
          <ul>
            {statusList?.map((item) => (
              <li key={item._id}>
                <p style={{ color: item.color }}>
                  {item.name} <br />
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </BoxWithHeader>
        <BoxWithHeader
          title="List Tag"
          btnTitle="Thêm tag"
          handleClickBtn={() => setIsShowAddTag(true)}
          className="__element"
        >
          <ul>
            {tags?.map((item) => (
              <li key={item._id}>
                <p>{item.title}</p>
              </li>
            ))}
          </ul>
        </BoxWithHeader>
        <BoxWithHeader title="Tiến độ dự án">
          <PieChart width={340} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx={160}
              cy={100}
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </BoxWithHeader>
      </div>

      <Modal
        isShow={isShowAddMember}
        title="Thêm thành viên"
        closeBtn="Close"
        onClose={() => setIsShowAddMember(false)}
        submitBtn="Add"
        onSubmit={onAddMember}
      >
        <InputNormal
          title="Tên thành viên"
          onChange={handleChangeAdd}
          value={addMem}
        />
      </Modal>

      <Modal
        isShow={isShowAddStatus}
        title="Thêm Status"
        closeBtn="Close"
        onClose={() => setIsShowAddStatus(false)}
        submitBtn="Add"
        onSubmit={onAddStatus}
      >
        <InputNormal
          title="Tên"
          name="name"
          onChange={onChangeStatusForm}
          value={addStatus.name}
        />
        <InputNormal
          title="Mô tả"
          name="description"
          onChange={onChangeStatusForm}
          value={addStatus?.description || ''}
        />
        <ColorPicker
          value={addStatus.color || ''}
          onChange={(hex) => setAddStatus({ ...addStatus, color: hex })}
        />
      </Modal>

      <Modal
        isShow={isShowAddTag}
        title="Thêm tag"
        closeBtn="Close"
        onClose={() => setIsShowAddTag(false)}
        submitBtn="Add"
        onSubmit={onAddTag}
      >
        <InputNormal
          title="Tên tag"
          onChange={(e) => setAddTagTitle(e.target.value)}
          value={addTagTitle}
        />
      </Modal>
    </DashboardWrapper>
  );
};

export default Dashboard;
