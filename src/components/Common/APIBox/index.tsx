import React, { FunctionComponent, memo, useMemo, useState } from 'react';
import { ReactComponent as ListIcon } from 'src/assets/icons/list.svg';
import { ReactComponent as ChatIcon } from 'src/assets/icons/chat.svg';
// import { METHOD_API } from 'src/lib/constants';
import { APIBoxWrapper } from './style';
import CopyField from 'src/components/Base/CopyField';
import IDoc from 'src/services/doc/types';
import ProgressBar from 'src/components/Base/Progress';
import ListAvt from 'src/components/Base/ListAvt';
import IconHover from 'src/components/Base/IconHover';
import { useAppSelector } from 'src/hooks/useAppSelector';
import PopupExtend from 'src/components/Base/PopupExtend';
interface IProps {
  docData: IDoc;
  onClickBox?: () => void;
  handleToChat?: () => void;
}
const APIBox: FunctionComponent<IProps> = memo(
  ({ docData, onClickBox, handleToChat }) => {
    const { title, method, host, endpoint, members } = docData;
    const styleClass = useMemo(() => {
      return method;
    }, [method]);

    const userId = useAppSelector((state) => state.user._id);
    const listMemberId = useMemo(
      () => members.map((i) => i.id_member),
      [members]
    );

    const [isShowMember, setIsShowMember] = useState(false);
    return (
      <APIBoxWrapper className={styleClass} onClick={onClickBox}>
        <div className="ApiBox__basic">
          <span>{title}</span>
          <div className="ApiBox__basic__url">
            <span className="ApiBox__basic__url_method">{method}</span>
            <CopyField value={host} />
            <CopyField value={endpoint} />
          </div>
        </div>

        <ProgressBar percent="32%" width={120} />
        <PopupExtend
          displayElement={
            <ListAvt
              people={members.map((item) => ({
                name: item.name,
                id: item.id_member,
              }))}
            />
          }
          popupElement={
            <div>
              {members.map((i) => (
                <p key={`member_explain_${i.id_member}`}>{i.name}</p>
              ))}
            </div>
          }
          onToggle={() => setIsShowMember(!isShowMember)}
          visible={isShowMember}
          position="top"
        />

        <IconHover>
          <ListIcon />
        </IconHover>
        {listMemberId.includes(userId) && (
          <IconHover>
            <ChatIcon onClick={handleToChat} />
          </IconHover>
        )}
      </APIBoxWrapper>
    );
  }
);

export default APIBox;
