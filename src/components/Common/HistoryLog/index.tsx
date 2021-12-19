import { FunctionComponent } from 'react';
import Box from 'src/components/Base/Box';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { formatTimeMess } from 'src/lib/helpers';
import { HistoryLogWrapper } from './style';

interface IProps {
  histories: Array<{
    author: {
      _id: string;
      first_name: string;
      last_name: string;
    };
    diff: {
      from: any;
      to: any;
    };
    createdAt: Date;
  }>;
}

const HistoryLog: FunctionComponent<IProps> = ({ histories }) => {
    const member = useAppSelector(state => state.project.info.members);
  return (
    <HistoryLogWrapper>
      {!!histories.length &&
        histories.map((item) => (
          <Box className="history">
            <b>
              {item.author.first_name} {item.author.last_name}
            </b>{' '}
            updated at <i>{formatTimeMess(item.createdAt)}</i> :
            <div>
              {!!item.diff.from &&
                Object.keys(item.diff.from).map((key: string) =>
                  Array.isArray(item.diff.from[key]) ? (
                    <div className='log_array'>
                      <div>
                        - {key}:{' '}
                        <p>{item.diff.from[key].join('\n')}</p>
                      </div>
                      <div>
                        =&gt; <p>{item.diff.to[key].join('\n')}</p>
                      </div>
                    </div>
                  ) : (
                    <p>
                      - {key}: <i className="form">{item.diff.from[key]}</i>{' '}
                      =&gt; <i>{item.diff.to[key]}</i>
                    </p>
                  )
                )}
            </div>
          </Box>
        ))}
    </HistoryLogWrapper>
  );
};

export default HistoryLog;
