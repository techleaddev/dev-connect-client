import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding: 16px;
  text-align: start;
  .modal {
    min-width: 32vw;
  }

  .__element {
    max-height: 250px;
    overflow-y: auto;
  }
`;
