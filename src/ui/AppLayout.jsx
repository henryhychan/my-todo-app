import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import styled from "styled-components";

const StyledAppLayout = styled.div`
    display: grid;
    grid-template-columns: 280px 1fr;
    grid-template-rows: auto 1fr;
    height: 100vh;
    @media (max-width: 1024px) {
        grid-template-columns: 220px 1fr;
    }

    @media (max-width: 768px) {
        grid-template-columns: 72px 1fr; /* match the collapsed sidebar */
    }
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: scroll;
`;

const Container = styled.div`
    max-width: 120rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Sidebar />
            {/* <Header /> */}
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;