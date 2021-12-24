import { color } from 'src/lib/theme/mixin';
import styled from 'styled-components';

export const DetailApiModalWrapper = styled.div`
  width: 80vw;
  height: 70vh;
  display: flex;
  flex-direction: column;
  /* overflow-y: hidden; */
  .detailApi {
    &__url {
      display: grid;
      grid-template-columns: 36px 1fr 2fr;
      column-gap: 8px;
      align-items: center;
      margin-bottom: 12px;
    }

    &__info {
      flex: 1;
      .verticalTab__tab {
        max-height: calc(70vh - 30px);
        overflow-y: auto;
      }
    }
  }
`;

export const CodeSnippetWrapper = styled.div`
  .copy-zone {
    background-color: ${color('header')};
    margin-top: 16px;
    border-radius: 4px;
    p {
      background-color: inherit;
      font-size: 14px;
    }
  }
`;

export const HistoryTabWrapper = styled.div`
  font-size: 14px;
  .history {
    margin: 8px;

    b:hover {
      text-decoration: underline;
    }
    p {
      margin: 4px 0;
    }
    .form {
      text-decoration: line-through;
    }
  }
`;

export const DetailTabWrapper = styled.div`
  .reviewDetail {
    display: grid;
    gap: 16px;
    margin-top: 16px;
    .dt_element {
      display: grid;
      grid-template-columns: 120px 1fr;
      
      h4,
      p {
        margin: 0;
        white-space: break-spaces;
      }
    }
  }
`;

export const TestTabWrapper = styled.div`
  display: grid;
  gap: 16px;
  .test_tab__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 400px;
    }
  }
`;
