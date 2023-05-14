import styled from "styled-components";
import Center from "./Center";
import TournamentsGrid from "./TournamentsGrid";

const Title = styled.h2`
    font-size: 2rem;
    font-weight: 600;
    margin: 40px 0 30px;
    color: #450a0a;
`;

export default function NewTournaments({tournaments}) {
    return (
        <Center>
            <Title>Recent Tournaments</Title>
            <TournamentsGrid tournaments={tournaments} />
        </Center>
    );
};
