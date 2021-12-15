import { color } from 'src/lib/theme/mixin';
import styled from 'styled-components';

export const DatePickerWrapper = styled.div`
  input {
    display: block;
    box-sizing: border-box;
    width: 100%;
    border-radius: 4px;
    border: 1px solid white;
    margin-bottom: 4px;
    font-size: 14px;
    outline: none;
    border: ${color('borderInput')} 1px solid;
    border-radius: 4px;
    padding: 12px;
    background-color: ${color('background2')};
    color: ${color('text1')};

    &:disabled {
      opacity: 0.5;
    }
  }
`;
