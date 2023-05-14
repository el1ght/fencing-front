import Link from "next/link";
import { useContext } from "react";
import styled from 'styled-components';
import Center from "./Center";
import { FollowedContext } from "./FollowedContext";
import SearchIcon from "./icons/SearchIcon";

const StyledHeader = styled.header`
  background-color: #450a0a;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
`;
const Logo = styled(Link)`
    color: #fff7ed;
    text-decoration: none;
    display: flex;
    align-items: center;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
    display: flex;
    align-items: center;
    gap: 15px;
`;

const NavLink = styled(Link)`
    color: #fff7ed;
    text-decoration: none;
    min-width: 30px;
    svg {
        height: 25px;
    }
`;

const SearchLink = styled(Link)`
    color: #fff7ed;
    font-size: 0;
    min-width: 30px;
    svg {
        height: 25px;
    }
`;

export default function Header() {
    const {followedTournaments} = useContext(FollowedContext);
    return (
        <StyledHeader>
            <Center>
                <Wrapper>
                        <Logo href={'/'}>FENCING</Logo>
                    
                    <StyledNav>
                        <NavLink href={'/'}>Home</NavLink>
                        <NavLink href={'/tournaments'}>Competitions</NavLink>
                        <NavLink href={'/categories'}>Categories</NavLink>
                        <NavLink href={'/followed'}>Followed ({followedTournaments.length})</NavLink>
                        
                    </StyledNav>
                        <SearchLink href={'/search'}>
                            <SearchIcon />
                        </SearchLink>
                </Wrapper>
                
            </Center>
        </StyledHeader>
    )
};
