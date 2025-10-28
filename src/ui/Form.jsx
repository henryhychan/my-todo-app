import styled, { css } from "styled-components";

const StyledForm = styled.form`
  ${(props) =>
    // props.type !== "modal" &&
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;
    `}

  justify-content: center;
  align-content: center;
  margin: 2rem;

  overflow: auto;
  font-size: 1.4rem;
`;

StyledForm.defaultProps = {
  type: "regular",
}

const FormWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  padding: 0 16px;
  margin: 0 auto;

  /* limit width on larger screens */
  max-width: ${props => props.maxWidth || '720px'};

  /* tweak for very small screens if needed */
  @media (max-width: 420px) {
    padding: 0 12px;
  }
`;

export default function Form({ children, onSubmit, type = 'regular', maxWidth, ...rest }) {
  return (
    <FormWrapper maxWidth={maxWidth}>
      <form onSubmit={onSubmit} {...rest}>
        {children}
      </form>
    </FormWrapper>
  );
}

