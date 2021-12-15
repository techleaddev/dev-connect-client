import styled from 'styled-components';

export const ColorPickerWrapper = styled.div`
  position: relative;
  .display {
    width: 100px;
    padding: 8px;
    border-radius: 2px;
    margin-top: 2px;
    text-align: center;
  }
  .picker {
    position: absolute;
    bottom: 0;
    left: 120px;
    display: none;
    &.active {
      display: block;
    }
  }
`;
