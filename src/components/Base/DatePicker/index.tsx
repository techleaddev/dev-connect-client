import { FunctionComponent } from 'react';
import ReactDatePicker from 'react-datepicker';
import { DatePickerWrapper } from './style';
interface IProps {
  value?: Date;
  onChange: (value: Date) => void;
  title: string;
  disabled?: boolean;
}
const DatePicker: FunctionComponent<IProps> = ({
  value,
  onChange,
  title,
  disabled,
}) => {
  return (
    <DatePickerWrapper>
      <span>{title}</span>
      <ReactDatePicker
        selected={value}
        onChange={onChange}
        disabled={disabled}
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;
