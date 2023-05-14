import styled, {css} from "styled-components";

export const ButtonStyle = css`
    border: none;
    border-radius: 5px;
    cursor: pointer;
    padding: 10px 20px;
    color: #fff7ed;
    svg{
        height: 16px;
        margin-right: 5px;
        vertical-align: bottom;
    }
    ${props => props.primary && !props.outline && css`
        background-color: #991b1b;
        border: 2px solid #991b1b;
    `}
    ${props => props.primary && props.outline && css`
        background-color: transparent;
        border: 2px solid #991b1b;
        font-size: 1.3rem;
        font-family: "Italiana", serif;
        svg{
            height: 20px;
            vertical-align: middle;
        }
    `}
    ${props => props.size === 'l' && css`
        font-size: 1.3rem;
    `}
    ${props => props.size === 's' && css`
        padding: 5px 10px;
    `}
    ${props => props.block && css`
        display: block;
        width: 100%;
    `}
`;

const StyledButton = styled.button`
    ${ButtonStyle}
`;

export default function Button({children,...rest}) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
};
