import {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Box from 'src/components/Base/Box';
import { formatTimeMess } from 'src/lib/helpers';
import { getDocHistoryApi } from 'src/services/doc/api';
import { IDocHistory } from 'src/services/doc/types';
import { HistoryTabWrapper } from './style';

interface IProps {
  docId: string;
}

const HistoryTab: FunctionComponent<IProps> = memo(({ docId }) => {
  const [histories, setHistories] = useState<IDocHistory[]>([]);
  const getDocHistory = useCallback(async () => {
    try {
      const result = await getDocHistoryApi(docId);
      setHistories(result);
    } catch (error) {}
  }, [docId]);
  useEffect(() => {
    getDocHistory();
  }, [getDocHistory]);
  return (
    <HistoryTabWrapper>
      {!!histories.length &&
        histories.map((item: IDocHistory) => (
          <Box className="history">
            <b>
              {item.author.first_name} {item.author.last_name}
            </b>{' '}
            updated at <i>{formatTimeMess(item.createdAt)}</i> :
            <div>
              {!!item.diff.from &&
                Object.keys(item.diff.from).map((key: string) => (
                  <p>
                    - {key}: <i className="form">{item.diff.from[key]}</i> =&gt; <i>{item.diff.to[key]}</i>
                  </p>
                ))}
            </div>
          </Box>
        ))}
    </HistoryTabWrapper>
  );
});

export default HistoryTab;
