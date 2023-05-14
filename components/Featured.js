import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import { useContext } from "react";
import { FollowedContext } from "./FollowedContext";

const Bg = styled.div`
    position: relative;
    background-color: #222;
    color: #fff;
    overflow: hidden;
    max-height: 65vh;
`;

const Title = styled.h1`
    color: #fff7ed;
    margin: 0 0 20px;
    font-weight: normal;
    font-size: 3.5rem;
`;
const Desc = styled.p`
    color: #fff7ed;
    font-size: 1.3rem;
    margin-bottom: 40px;
`;
const Video = styled.video`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transform: scale(1.35);
`;
const Shadow = styled.div`
    background-color: rgba(0, 0, 0, 0.75);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;
const TextBox = styled.div`
    position: relative;
    z-index: 10;
    padding: 200px 0;
`;
const Highlight = styled.span`
    color: #b91c1c;
    font-weight: 600;
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px
`;



export default function Featured({tournament}) {
    const {addTournament} = useContext(FollowedContext)
    function addFeaturedToFollowed() {
        addTournament(tournament._id);
    }
    return (
        <Bg>
            <Center>
                <TextBox>
                    <Title><Highlight>{tournament.title.split(' ')[0]}</Highlight>&nbsp;{tournament.title.split(' ').splice(1).join(' ')}</Title>
                    <Desc>{tournament.description}</Desc>

                    <ButtonWrapper>
                        <ButtonLink href={'/tournament/'+tournament._id} primary={1} size="l">Check Now</ButtonLink>
                        <Button primary={1} outline={1} onClick={addFeaturedToFollowed}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                            Follow
                        </Button>
                    </ButtonWrapper>

                </TextBox>
            </Center>

            <Video autoPlay loop muted>
                <source src="https://next-fencing.s3.amazonaws.com/videoplayback.mp4" type="video/mp4" />
            </Video>
            <Shadow />
            

        </Bg>
    )
};