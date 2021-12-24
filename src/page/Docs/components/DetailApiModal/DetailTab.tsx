import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Box, { BoxWithHeader } from 'src/components/Base/Box';
import Button from 'src/components/Base/Button';
import { InputNormal } from 'src/components/Base/Input';
import { TextAreaNormal } from 'src/components/Base/TextArea';
import { DetailTabWrapper } from './style';
import { IDocEditData } from '../../../../services/doc/types';
import { editDocApi, getDocDetailApi } from 'src/services/doc/api';
import { METHOD_API } from 'src/lib/constants';
import { REQUEST_TYPE } from 'src/lib/constants/options';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addSnackBar } from 'src/services/app';

interface IProps {
  docId: string;
}
const DetailTab: FunctionComponent<IProps> = ({ docId }) => {
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [detail, setDetail] = useState<IDocEditData>({
    title: '',
    description: '',
    endpoint: '',
    host: '',
    method: METHOD_API.GET,
    requestBody: {},
    requestType: REQUEST_TYPE.JSON,
    responseBody: {},
    responseType: REQUEST_TYPE.JSON,
    status: [],
  });

  const getDocDetail = useCallback(async () => {
    const data = await getDocDetailApi(docId);
    setDetail(data as IDocEditData);
  }, [docId]);

  useEffect(() => {
    if (docId) {
      getDocDetail();
    }
  }, [docId, getDocDetail]);
  const handleOnEdit = async () => {
    if (isEdit) {
      try {
        await editDocApi({ docId, data: detail });
        setIsEdit(false);
        dispatch(addSnackBar({ type: 'success', message: 'Edit doc success' }));
      } catch (err) {
        dispatch(
          addSnackBar({
            type: 'error',
            message: 'Edit doc error :' + String(err),
          })
        );
      }
    } else {
      setIsEdit(true);
    }
  };

  const handleChangeDetail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDetail((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <DetailTabWrapper>
      <Button title="Edit" onClick={handleOnEdit} />
      {isEdit ? (
        <div style={{ marginTop: 8, display: 'grid', gap: 8 }}>
          <InputNormal
            value={detail.title}
            title="Tiêu đề"
            name="title"
            onChange={handleChangeDetail}
          />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: 12,
            }}
          >
            <InputNormal
              value={detail.method}
              title="Phưng thức"
              name="method"
              onChange={handleChangeDetail}
            />
            <InputNormal
              value={detail.host}
              title="Host"
              name="host"
              onChange={handleChangeDetail}
            />
            <InputNormal
              value={detail.endpoint}
              title="Endpoint"
              name="endpoint"
              onChange={handleChangeDetail}
            />
          </div>
          <TextAreaNormal
            value={detail.description}
            title="Mô tả"
            name="description"
            onChange={handleChangeDetail}
          />
        </div>
      ) : (
        <div className="reviewDetail">
          <Box className="dt_element">
            <h4>Title: </h4> <span>{detail.title}</span>
            <h4>Method: </h4> <span>{detail.method}</span>
            <h4>Host: </h4> <span>{detail.host}</span>
            <h4>Endpoint: </h4> <span>{detail.endpoint}</span>
          </Box>
          {!!detail.requestBody && (
            <BoxWithHeader
              title="Request body"
              className="dt_element"
              btnTitle={detail.requestType}
              handleClickBtn={() => null}
            >
              <p>{String(detail.requestBody)}</p>
            </BoxWithHeader>
          )}
          {!!detail.responseBody && (
            <BoxWithHeader
              title="Request body"
              className="dt_element"
              btnTitle={detail.responseType}
              handleClickBtn={() => null}
            >
              <p>{String(detail?.responseBody)}</p>
            </BoxWithHeader>
          )}
          <BoxWithHeader title="Description">
            <p>{detail?.description}</p>
          </BoxWithHeader>
        </div>
      )}
    </DetailTabWrapper>
  );
};

export default DetailTab;
