import styled from "styled-components";

const StyledTable = styled.table`
    width: 100%;
    font-weight: 600;
    color: #991b1b;
    font-family: "Times New Roman", serif;
    th{
        font-family: 'Italiana', serif;
        text-align: left;
        text-transform: uppercase;
        font-size: .9rem;
        color: #450a0a;
    }
`;

export default function Table(props) {
    return (
        <StyledTable {...props} />
    );
};
