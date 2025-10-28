import styled, { css } from "styled-components";


const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  background-color: var(--tag-bgcolor-${(props) => props.type});
  color: var(--tag-color-${(props) => props.type});

  @media(max-width:768px) {
    font-size: 0.8rem;
  }
`;

Tag.defaultProps = {
  type: 'tag1',
}


export default Tag;
