import { CopyFieldWrapper } from './style';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy.svg';
import { FunctionComponent, memo, ReactNode } from 'react';
import { useAppDispatch } from 'src/hooks/useAppDispatch';
import { addSnackBar } from 'src/services/app';
interface IProps {
  value: string;
  className?: string;
  display?: ReactNode;
}
const CopyField: FunctionComponent<IProps> = memo(
  ({ value, className, display }) => {
    const dispatch = useAppDispatch();
    function copyToClipboard(e: any) {
      e.stopPropagation();
      navigator.clipboard.writeText(value);
      dispatch(addSnackBar({ type: 'info', message: 'Copied to clipboard !' }));
    }

    return (
      <CopyFieldWrapper className={className} onClick={copyToClipboard}>
        <button className="copy-btn" onClick={copyToClipboard}>
          <CopyIcon />
        </button>
        {display ? display : <p>{value}</p>}
      </CopyFieldWrapper>
    );
  }
);

export default CopyField;
