import Link from "next/link";
import { useContext } from "react";
import Button from "./Button";
import { FollowedContext } from "./FollowedContext";

const { default: styled } = require("styled-components");

const TournamentWrapper = styled.div`
    position: relative;
    font-size: 0;
    height: 200px;
    border-radius: 20px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 300px 1fr;
    box-shadow: 2px 2px 5px #adadad;
    
`;

const ImageWrapper = styled.div`
overflow: hidden;
    img {
        max-width: 100%;
        height: 100%;
        transform: scale(1.05);
    }
`;

const TextWrapper = styled.div`
    font-size: 2rem;
    color: black;
    padding: 30px;
    background-color: #ffdeb5;
    color: #450a0a;
`;

const Title = styled(Link)`
    color: #450a0a;
    text-decoration: none;
    font-size: 2rem;
    margin: 0;
    font-weight: 600;
`;

const Descr = styled.p`
    color: #450a0a;
    font-family: "Times New Roman", serif;
    font-size: 1.1rem;
    margin: 10px 0 25px;
`;

const Date = styled.span`
    position: absolute;
    bottom: -20px;
    right: 10px;
    font-size: 5rem;
`;


export default function TournamentBox({_id, title, description, date, images}) {
    const {addTournament} = useContext(FollowedContext);
    const url = '/tournament/'+_id;
    return (
        <TournamentWrapper>
            <ImageWrapper>
                <img src={images?.[0]} />
            </ImageWrapper>
                

            <TextWrapper>
                <Title href={url}>{title}</Title>
                
                <Descr>{description}</Descr>

                <Date>{date}</Date>

                <Button primary={1} onClick={() => addTournament(_id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    Follow
                </Button>
            </TextWrapper>

                

        </TournamentWrapper>
    )
};
