import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "./Button";

const StyledLink = styled(Link)`
    ${ButtonStyle}
    // font-family: 'Arial', sans-serif;
    font-weight: 600;
    text-decoration: none;
`;

export default function ButtonLink(props) {
    return(
        <StyledLink {...props} />
    );
};
