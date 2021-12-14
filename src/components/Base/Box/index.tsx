import { FunctionComponent, memo, ReactNode } from 'react';
import Button from '../Button';
import { BoxWrapper } from './style';
interface IProps {
  children: ReactNode;
  onClickBox?: () => void;
  disable?: boolean;
  className?: string;
}
const Box: FunctionComponent<IProps> = memo(
  ({ children, onClickBox, disable = false, className }) => {
    return (
      <BoxWrapper
        {...(!disable && { onClick: onClickBox })}
        className={className}
      >
        {children}
      </BoxWrapper>
    );
  }
);

export default Box;

interface IBowWithHeaderProps {
  title: string;
  btnTitle?: string;
  handleClickBtn?: () => void;
}
export const BowWithHeader: FunctionComponent<IProps & IBowWithHeaderProps> =
  memo(
    ({
      children,
      onClickBox,
      disable = false,
      className,
      title,
      btnTitle,
      handleClickBtn,
    }) => {
      return (
        <BoxWrapper {...(!disable && { onClick: onClickBox })}>
          <div className="box__header">
            <h4>{title}</h4>
            {!!btnTitle && !!handleClickBtn && (
              <Button title={btnTitle} onClick={handleClickBtn} className='info' />
            )}
          </div>
          <div className={className}>{children}</div>
        </BoxWrapper>
      );
    }
  );
