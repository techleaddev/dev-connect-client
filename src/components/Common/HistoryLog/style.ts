import styled from "styled-components";

export const HistoryLogWrapper = styled.div`
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

    .log_array{
        display: flex;
        /* justify-content: space-between; */
        margin-top: 8px;
        div{
            display: flex;
            /* align-items: center; */
            margin-right: 16px;
        }
        p{
            white-space: break-spaces;
            margin: 0;
            margin-left: 8px;
        }
    }
  }
`;
