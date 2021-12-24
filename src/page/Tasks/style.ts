import styled from 'styled-components';

export const TaskScreenSwapper = styled.div`
  .taskListItem_box {
    padding: 0;
    margin: 16px;
    text-align: start;
    .taskListItem {
      padding: 8px;
      border-radius: 4px;
      display: grid;
      grid-template-columns: 68px 160px 160px 120px 0.5fr 1fr 100px 64px;
      border-left: 4px solid;
      align-items: center;
/* 
      &.taskInDoc {
        grid-template-columns: 68px 160px 160px 120px 0.5fr 1fr 100px;
      } */

      p {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .listTags {
        display: block;
      }

      .editView {
        display: flex;
        justify-content: space-between;
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

export const DetailTaskModalWrapper = styled.div`
  .dt_edit__btn {
    width: 60px;
    justify-self: flex-end;
    text-align: center;
  }
  .verticalTab__tab {
    width: 60vw;
    height: calc(70vh - 30px);
  }
`;

export const DetailTabWrapper = styled.div`
  display: grid;
  gap: 16px;

  .dt_element {
    padding: 8px;
    display: grid;
    grid-template-columns: 100px 1fr;
    gap: 8px;
    h4,
    p {
      margin: 0;
    }
  }
`;
