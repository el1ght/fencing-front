import styled from "styled-components";
import TournamentBox from "./TournamentBox";

const StyledTournamentsGrid = styled.div`
    display: grid;
    grid-rows: 1fr;
    gap: 20px;
    margin-bottom: 60px;
`;

export default function TournamentsGrid({tournaments}) {
    return (
        <StyledTournamentsGrid>
            {tournaments?.length > 0 && tournaments.map(tournament => (
                <TournamentBox key={tournament._id} {...tournament} />
            ))}
        </StyledTournamentsGrid>
    );
};
