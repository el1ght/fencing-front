import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";

const StyledFooter = styled.footer`
    background-color: #450a0a;
`;

const FooterText = styled.p`
    color: #fff7ed;
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;

`;

export default function Footer() {
    return (
        <StyledFooter>
            <Center>
                <Wrapper>
                    <FooterText>2023 Made by Bogdan Gilevich</FooterText>
                    <FooterText>FENCING</FooterText>
                    <FooterText>From KPI with love</FooterText>
                </Wrapper>
            </Center>
        </StyledFooter>
    );
};
