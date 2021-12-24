import { BoxWithHeader } from 'src/components/Base/Box';
import styled from 'styled-components';

export const ListMemberWrapper = styled(BoxWithHeader)`
  .member__element {
    max-height: 250px;
    overflow-y: auto;

    &__item {
      display: flex;
      justify-content: space-between;
    }
  }
`;
