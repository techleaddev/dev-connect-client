import { color } from 'src/lib/theme/mixin';
import styled from 'styled-components';

export const TaskScreenSwapper = styled.div`
  .taskListItem_box {
    padding: 0;
    margin: 16px;
    text-align: start;
    .taskListItem {
      padding: 16px;
      border-radius: 4px;
      display: grid;
      grid-template-columns: 68px 160px 160px 120px 0.5fr 1fr 100px;
      border-left: 4px solid;
      p {
        margin: 0;
      }
      .tag {
        margin-right: 8px;
        border: 1px solid ${color('header')};
        background-color: ${color('background1')};
        padding: 4px;
        border-radius: 8px;
      }
    }

    &.no_border {
      .taskListItem {
        border: hidden;
      }
    }
  }
`;

export const AddTaskModalWrapper = styled.div`
  width: 60vw;
  display: grid;
  gap: 16px;

  .task_group {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
  }
`;
