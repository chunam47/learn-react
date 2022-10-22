import styled from "styled-components";

export const DialogWrapper = styled.div`
  position: relative;
  .icon-close {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
    cursor: pointer;
  }

  .mode {
    text-transform: inherit;
    text-align: center;
  }
`;
