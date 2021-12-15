import { FunctionComponent } from 'react';
import ReactDatePicker from 'react-datepicker';
import { DatePickerWrapper } from './style';
interface IProps {
  value?: Date;
  onChange: (value: Date) => void;
  title: string;
}
const DatePicker: FunctionComponent<IProps> = ({ value, onChange, title }) => {
  return (
    <DatePickerWrapper>
      <span>{title}</span>
      <ReactDatePicker selected={value} onChange={onChange} />
    </DatePickerWrapper>
  );
};

export default DatePicker;
