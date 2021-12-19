import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import Modal from 'src/components/Base/Modal';
import VerticalTab from 'src/components/Base/VerticalTab';
import { TaskTranslateKeyType } from 'src/lib/translations/vn/task';
import DetailTab from './DetailTab';
import { ReactComponent as VectorIcon } from 'src/assets/icons/vector.svg';
import { ReactComponent as ClipIcon } from 'src/assets/icons/clip.svg';
import { ReactComponent as ChatIcon } from 'src/assets/icons/chat.svg';

import { ReactComponent as TimeIcon } from 'src/assets/icons/time-past.svg';
import { DetailTaskModalWrapper } from '../style';
import { getTaskDetailApi } from 'src/services/tasks/api';
import { ITask } from 'src/services/tasks/types';
import HistoryTab from './HistoryTab';
interface IProps {
  isShow: boolean;
  taskId: string;
  onClose(): void;
}

const DetailTaskModal: FunctionComponent<IProps> = memo(
  ({ isShow, taskId, onClose }) => {
    const { t } = useTranslation();
    const words = useCallback(
      (title: TaskTranslateKeyType) => t(`taskTranslate.${title}`),
      [t]
    );
    const [dataDetail, setDataDetail] = useState<ITask>();
    const TAB = useMemo(
      () => [
        {
          key: 1,
          tab: <DetailTab editId={taskId} />,
        },
        //   {
        //     key: 2,
        //     tab: <CodeSnippet {...data} />,
        //   },
        //   { key: 3, tab: <TestTab /> },
        { key: 4, tab: <HistoryTab taskId={taskId} /> },
        //   { key: 6, tab: <HistoryTab docId={taskId} /> },
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [taskId]
    );
    const MENU = useMemo(
      () => [
        { key: 1, label: words('description'), icon: <VectorIcon /> },
        { key: 2, label: words('document'), icon: <ClipIcon /> },
        { key: 3, label: words('comment'), icon: <ChatIcon /> },
        { key: 4, label: words('history'), icon: <TimeIcon /> },
      ],
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );
    const getTaskDetail = useCallback(async () => {
      const data = await getTaskDetailApi(taskId || '');
      setDataDetail(data);
    }, [taskId]);

    useEffect(() => {
      getTaskDetail();
    }, [getTaskDetail]);
    return (
      <Modal
        isShow={isShow}
        title={`Task: #${taskId.slice(-5)} ${dataDetail?.title}`}
        closeBtn="Close"
        onClose={onClose}
      >
        <DetailTaskModalWrapper>
          <VerticalTab tabs={TAB} menu={MENU} className="detailApi__info" />
        </DetailTaskModalWrapper>
      </Modal>
    );
  }
);

export default DetailTaskModal;
