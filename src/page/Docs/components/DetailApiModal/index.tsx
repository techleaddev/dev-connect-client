import { FunctionComponent, useMemo } from 'react';
import CopyField from 'src/components/Base/CopyField';
import Modal from 'src/components/Base/Modal';
import VerticalTab from 'src/components/Base/VerticalTab';
import IDoc from 'src/services/doc/types';
import { ReactComponent as VectorIcon } from 'src/assets/icons/vector.svg';
import { ReactComponent as CodeIcon } from 'src/assets/icons/code.svg';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { ReactComponent as LabIcon } from 'src/assets/icons/lab.svg';
import { ReactComponent as PeopleIcon } from 'src/assets/icons/people.svg';
import { ReactComponent as TimeIcon } from 'src/assets/icons/time-past.svg';
import { DetailApiModalWrapper } from './style';
import { DocTranslateKeyType } from 'src/lib/translations/vn/doc';
import CodeSnippet from './CodeSnippet';
import HistoryTab from './HistoryTab';
import DetailTab from './DetailTab';
import TestTab from './TestTab';
import TaskScreen from 'src/page/Tasks';
interface IProps {
  isShow: boolean;
  onClose: () => void;
  data: IDoc;
  words: (title: DocTranslateKeyType) => string;
}

const DetailApiModal: FunctionComponent<IProps> = ({
  isShow,
  onClose,
  data,
  words,
}) => {
  const TAB = useMemo(
    () => [
      {
        key: 1,
        tab: <DetailTab docId={data._id} />,
      },
      {
        key: 2,
        tab: <CodeSnippet {...data} />,
      },
      { key: 3, tab: <TestTab /> },
      { key: 4, tab: <TaskScreen showHeader={false} /> },
      { key: 6, tab: <HistoryTab docId={data._id} /> },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  const MENU = useMemo(
    () => [
      { key: 1, label: words('description'), icon: <VectorIcon /> },
      { key: 2, label: words('code'), icon: <CodeIcon /> },
      { key: 3, label: words('lab'), icon: <LabIcon /> },
      { key: 4, label: words('tasks'), icon: <ListIcon /> },
      { key: 5, label: words('members'), icon: <PeopleIcon /> },
      { key: 6, label: words('history'), icon: <TimeIcon /> },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Modal
      title={`API: ${data.title}`}
      isShow={isShow}
      onClose={onClose}
      closeBtn="Close"
    >
      <DetailApiModalWrapper>
        <div className="detailApi__url">
          URL:
          <CopyField value={data.host} />
          <CopyField value={data.endpoint} />
        </div>
        <VerticalTab tabs={TAB} menu={MENU} className="detailApi__info" />
      </DetailApiModalWrapper>
    </Modal>
  );
};

export default DetailApiModal;
