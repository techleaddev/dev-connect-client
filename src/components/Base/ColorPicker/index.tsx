import clsx from 'clsx';
import { FunctionComponent, memo, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import { ColorPickerWrapper } from './style';

interface IProps {
  value: string;
  onChange: (value: string) => void;
}
const ColorPicker: FunctionComponent<IProps> = memo(({ value, onChange }) => {
  const [isShowPicker, setIsShowPicker] = useState(false);
  const handleChange = (value: string) => {
    setIsShowPicker(false);
    onChange(value);
  };
  return (
    <ColorPickerWrapper>
      <label htmlFor="">Màu sắc</label>
      <div
        className="display"
        style={{
          backgroundColor: value || '#000',
        }}
        onClick={() => setIsShowPicker(true)}
      >
        {value || '#000'}
      </div>
      <div className={clsx('picker', { active: isShowPicker })}>
        <HexColorPicker color={value || '#000'} onChange={handleChange} />
      </div>
    </ColorPickerWrapper>
  );
});

export default ColorPicker;
