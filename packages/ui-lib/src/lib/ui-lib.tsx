import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface UiLibProps {}

const StyledUiLib = styled.div`
  color: pink;
`;

export function UiLib(props: UiLibProps) {
  return (
    <StyledUiLib>
      <h1>Welcome to UiLib!</h1>
    </StyledUiLib>
  );
}

export default UiLib;
