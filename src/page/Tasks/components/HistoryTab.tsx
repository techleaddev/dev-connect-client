import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import HistoryLog from 'src/components/Common/HistoryLog';
import { getHistoryDetailApi } from 'src/services/tasks/api';
import { ITaskHistory } from 'src/services/tasks/types';

interface IProps {
  taskId: string;
}

const HistoryTab: FunctionComponent<IProps> = memo(({ taskId }) => {
  const [histories, setHistories] = useState<ITaskHistory[]>([]);
  const getDocHistory = useCallback(async () => {
    try {
      const result = await getHistoryDetailApi(taskId);
      setHistories(result);
    } catch (error) {}
  }, [taskId]);

  useEffect(() => {
    getDocHistory();
  }, [getDocHistory]);

  return <HistoryLog histories={histories} />;
});

export default HistoryTab;
