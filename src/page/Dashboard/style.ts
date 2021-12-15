import styled from 'styled-components';

export const DashboardWrapper = styled.div`
  padding: 16px;
  display: grid;
  gap: 16px;
  .__description{
    text-align: start;
    display: grid;
    gap: 12px;
  }
  .dashboardSetting {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    text-align: start;
    .modal {
      min-width: 32vw;
    }

    .__element {
      max-height: 250px;
      overflow-y: auto;
    }
  }
`;
