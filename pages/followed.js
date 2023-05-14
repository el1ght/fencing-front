import Button from "@/components/Button";
import Center from "@/components/Center";
import { FollowedContext } from "@/components/FollowedContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Input from "@/components/Input";
import Table from "@/components/Table";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr .7fr;
    gap: 40px;
    
`;

const Box = styled.div`
    background-color: #ffdeb5;
    border-radius: 20px;
    margin-top: 40px;
    padding: 30px;
    color: #450a0a;
    font-weight: 600;
    margin-top: 100px;
`;

const Heading = styled.h1`
    margin: 10px 0 20px;
`;

const Paragraph = styled.p`
    margin-top: 0;
    font-family: "Times New Roman", serif;
`;

export default function FollowedPage() {
    const {followedTournaments, removeTournament, clearFollowed} = useContext(FollowedContext);
    const [tournaments, setTournaments] = useState([]);
    const [email, setEmail] = useState('');
    const router = useRouter();
    useEffect(() => {
        if (followedTournaments.length > 0) {
            axios.post('/api/followed', {ids: followedTournaments})
                .then(response => {
                    setTournaments(response.data);
                })
        } else {
            setTournaments([]);
        }
    }, [followedTournaments]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        if (window?.location.href.includes('success')) {
            clearFollowed();
        }
    }, [])

    function removeThisTournament(id) {
        removeTournament(id);
    }

    async function goToSubscription() {
        router.push('?success=1');
        await axios.post('/api/contact', {
            email, 
            followedTournaments,
        });
        
    }

    if (window?.location.href.includes('success')) {
        return (
            <>
                <Header />
                <Center>
                    <Box>
                    <Heading>Subscription successful!</Heading>
                    <Paragraph>We will email you when the information about the tournament is updated</Paragraph>
                    </Box>
                </Center>
            
            </>
        )
    }
        

    return (
        <>
            <Header />
            <Center>
                <ColumnsWrapper>
                    <Box>
                        <h2>Followed</h2>
                        {!followedTournaments?.length && (
                            <div>You still don't follow anything</div>
                        )}
                        {tournaments?.length > 0 && (
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Tournament</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tournaments.map(tournament => (
                                        <tr key={tournament._id}>
                                            <td>
                                                {tournament.title}
                                            </td>
                                            <td>{tournament.date}</td>
                                            <td><Button onClick={() => removeThisTournament(tournament._id)} primary={1} size={'s'}>Unfollow</Button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        )}
                    </Box>
                    {!!followedTournaments?.length && (
                        <Box>
                            <h2>Subscribe to updates</h2>
                                <Input type="text" placeholder="Your email" name="email" value={email} onChange={ev => setEmail(ev.target.value)}></Input>
                                <input type="hidden" name="tournaments" value={followedTournaments.join(',')} required pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" />
                                <Button primary={1} block={1} onClick={goToSubscription} disabled={!email}>Subscribe!</Button>
                        </Box>
                    )}

                </ColumnsWrapper>
            </Center>
        </>
    );
};
