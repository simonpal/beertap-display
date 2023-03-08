import styled from "styled-components";

interface KegWrapperProps {
  noKegs: number;
}
export const KegRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;
export const KegWrapper = styled.div<KegWrapperProps>`
  width: ${(props) => `${100 / props.noKegs}%`};
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 0 1rem;
`;
