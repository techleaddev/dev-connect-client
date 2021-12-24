import { ChangeEvent, FunctionComponent, memo, useEffect, useRef } from 'react';
import { Controller } from 'react-hook-form';
import { IFromProps } from '../@types/formTypes';
import { TextAreaContain, TextAreaWrapper } from './styled';

interface IComponentProps {
  error?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  title?: string;
}
type IProps = IFromProps & IComponentProps;

const TextArea: FunctionComponent<IProps> = memo(
  ({
    name,
    control,
    rules,
    defaultValue = '',
    error,
    placeholder,
    className,
    title,
  }) => {
    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <TextAreaContain className={className}>
            {!!title && <label>{title}</label>}
            <TextAreaWrapper
              {...field}
              // name={field.name}
              placeholder={placeholder}
              // onChange={field.onChange}
            />
            {error && <i>{error}</i>}
          </TextAreaContain>
        )}
      />
    );
  }
);

export default TextArea;

type INormalProps = {
  name?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  disable?: boolean;
  fullSize?: boolean;
};
export const TextAreaNormal: FunctionComponent<IComponentProps & INormalProps> =
  ({
    className,
    title,
    placeholder,
    error,
    onChange,
    name,
    value,
    disable,
    fullSize,
  }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (fullSize) {
        if (textareaRef?.current) {
          textareaRef.current.style.height = '0px';
          const scrollHeight = textareaRef.current.scrollHeight;
          textareaRef.current.style.height = scrollHeight + 'px';
        }
      }
    }, [fullSize, value]);
    return (
      <TextAreaContain className={className}>
        {!!title && <label>{title}</label>}
        <TextAreaWrapper
          ref={textareaRef}
          value={value}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disable}
        />
        {error && <i>{error}</i>}
      </TextAreaContain>
    );
  };
