import styled from 'styled-components';

export const DocsScreenWrapper = styled.div`
  .docScreen__list_doc {
    margin-top: 16px;
    display: grid;
    padding: 0 12px;
    row-gap: 16px;
    text-align: start;

    &__header {
      display: grid;
      padding: 12px 8px;
      grid-template-columns: 1fr 180px 200px 64px;
      gap: 18px;
      div:first-child {
        display: grid;
        grid-template-columns: 60px 1fr 1fr;
      }
    }
  }
`;
