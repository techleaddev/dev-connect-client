import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import APIBox from 'src/components/Common/APIBox';
import HeaderTool from 'src/components/Common/HeaderTool';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { DocTranslateKeyType } from 'src/lib/translations/vn/doc';
import { createAppErr } from 'src/services/app';
import { getListDocsApi } from 'src/services/doc/api';
import AddDocApi from './components/AddDocApi';
import IDoc from '../../services/doc/types';
import { DocsScreenWrapper } from './style';
import DetailApiModal from './components/DetailApiModal';
import Pagination from 'src/components/Base/Pagination';
import { useHistory } from 'react-router';
import ROUTER_NAME from 'src/lib/constants/router';
import Box from 'src/components/Base/Box';

const DocsScreen = () => {
  const projectId = useAppSelector((state) => state.app.projectId);
  const dispatch = useAppDispatch();

  const [isShowAdd, setIsShowAdd] = useState<boolean>(false);
  const [listDocs, setListDocs] = useState<IDoc[]>([]);
  const [isShowDetail, setIsShowDetail] = useState<boolean>(false);
  const [detailDoc, setDetailDoc] = useState<IDoc>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [searchKey, setSearchKey] = useState('');

  const { t } = useTranslation();
  const words = useCallback(
    (title: DocTranslateKeyType) => t(`docTranslate.${title}`),
    [t]
  );

  const history = useHistory();

  const getListDocs = useCallback(
    async (page: number, search: string) => {
      try {
        const result = await getListDocsApi(projectId, page, search);
        setListDocs(result.data);
        setTotalPage(result.meta.totalPage);
      } catch (error) {
        dispatch(
          createAppErr({
            title: error as string,
          })
        );
      }
    },
    [dispatch, projectId]
  );

  useEffect(() => {
    getListDocs(currentPage, searchKey);
  }, [currentPage, getListDocs, searchKey]);

  const onOpenDetail = (id: string) => {
    if (detailDoc?._id !== id) {
      setDetailDoc(listDocs.find((item) => item._id === id));
    }
    setIsShowDetail(true);
  };

  const gotoChatScreen = (id: string) => {
    history.push({ pathname: ROUTER_NAME.chat.path, state: { docId: id } });
  };

  return (
    <DocsScreenWrapper>
      <HeaderTool
        handleAddNew={() => setIsShowAdd(true)}
        onSearch={(searchKey) => setSearchKey(searchKey)}
      />
      <div className="docScreen__list_doc">
        {listDocs.length ? listDocs.map((item) => (
          <APIBox
            docData={item}
            key={item._id}
            onClickBox={() => onOpenDetail(item._id)}
            handleToChat={() => gotoChatScreen(item._id)}
          />
        )) : <Box>{words('empty')}</Box>}
      </div>
      {detailDoc && (
        <DetailApiModal
          isShow={isShowDetail}
          data={detailDoc}
          onClose={() => setIsShowDetail(false)}
          words={words}
        />
      )}
      <AddDocApi
        isShow={isShowAdd}
        handleDismiss={() => setIsShowAdd(false)}
        words={words}
      />
      <Pagination
        totalPage={totalPage}
        current={currentPage}
        onChangePage={(page) => setCurrentPage(page)}
      />
    </DocsScreenWrapper>
  );
};

export default DocsScreen;
