import styled from 'styled-components';
import { color } from '../../lib/theme/mixin';

export const PreferencesWrapper = styled.div`
  background-color: ${color('background1')};
  display: grid;
  gap: 16px;
  padding: 16px;
  text-align: start;
  .goBack_btn{
    width: 100px;
  }
  .preferences__item {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
  .change_password {
    width: 24vw;
  }
  .listTheme {
    display: flex;
    justify-content: space-between;
    .themeBox {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 200px;
      height: 80px;
      border-radius: 8px;
      color: #957878;

      &.active{
        border: 1px solid pink;
      }
    }
  }
`;
