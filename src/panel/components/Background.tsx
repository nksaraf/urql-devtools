import styled from "styled-components";

export const Background = styled.div`
  overflow: hidden;
  position: fixed;
  background-color: ${(props) => props.theme.dark[0]};
  top: 28px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;

  @media (min-aspect-ratio: 1/1) {
    flex-direction: row;
  }
`;
