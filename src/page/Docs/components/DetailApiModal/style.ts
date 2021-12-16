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
  padding: 16px;

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
  padding: 8px;
  font-size: 14px;
  .history {
    padding: 8px;
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
  padding: 8px;
`;

export const TestTabWrapper = styled.div`
  padding: 16px;
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
