import styled from "styled-components";
import Logo from "./Logo.jsx";
import MainNav from "./MainNav.jsx";
import { useMediaQuery } from 'react-responsive';

const StyledSidebar = styled.aside`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-right: 1px solid var(--color-grey-100);
    grid-row: 1 / -1;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    
    /* default desktop width */
    width: 280px;
    min-width: 220px;

    /* tablet */
    @media (max-width: 1024px) {
      width: 220px;
      padding: 1rem 2rem;
    }

    /* mobile — collapsed narrow sidebar for icons only */
    @media (max-width: 768px) {
      width: 72px;
      min-width: 72px;
      padding: 1rem 0.6rem;
      gap: 1.2rem;
      align-items: center; /* center icons */
    }
`;

function Sidebar() {
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1200px)'});

    return (
        <StyledSidebar>
            { isDesktopOrLaptop && <Logo/>}
            <MainNav/>
        </StyledSidebar>
    )
}

export default Sidebar;