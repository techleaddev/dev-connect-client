import { color } from 'src/lib/theme/mixin';
import styled from 'styled-components';

export const SelectFieldWrapper = styled.div`
  text-align: start;
  color: ${color('text1')};

  label {
    padding-left: 4px;
    font-size: 14px;
  }

  .css-yk16xz-control {
    padding: 4px 0;
    background-color: ${color('background2')};

    .css-1uccc91-singleValue {
      color: ${color('text1')};
    }
  }

  .css-1pahdxg-control {
    padding: 4px 0;
    background-color: ${color('background2')};

    .css-1uccc91-singleValue {
      color: ${color('text1')};
    }
  }

  i {
    color: ${color('error')};
    padding-left: 4px;
    font-size: 80%;
  }
`;
