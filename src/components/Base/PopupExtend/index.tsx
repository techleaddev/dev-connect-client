import {
  FunctionComponent,
  memo,
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { PopupExtendWrapper } from './style';

interface IProps {
  visible?: boolean;
  onToggle: () => void;
  displayElement: ReactNode;
  popupElement: ReactNode;
  position?: 'left' | 'right' | 'top' | 'bottom';
}

const PopupExtend: FunctionComponent<IProps> = memo(
  ({
    displayElement,
    popupElement,
    position = 'left',
    visible = false,
    onToggle,
  }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    const onHandleToggle = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      onToggle();
    };

    const handleClickOutSide = useCallback(
      (event: any) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
          if (visible) {
            onToggle();
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [visible]
    );

    useEffect(() => {
      document.addEventListener('click', handleClickOutSide, true);
      if (!visible) {
        document.removeEventListener('click', handleClickOutSide, true);
      }
      return () => {
        document.removeEventListener('click', handleClickOutSide, true);
      };
    }, [handleClickOutSide, visible]);

    return (
      <PopupExtendWrapper ref={popupRef}>
        <div className="displayElement" onClick={onHandleToggle}>
          {displayElement}
        </div>
        <div className={`popupElement${visible ? ' show' : ''} ${position}`}>
          {popupElement}
        </div>
      </PopupExtendWrapper>
    );
  }
);

export default PopupExtend;
