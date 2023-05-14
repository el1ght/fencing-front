import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Title from "@/components/Title";
import TournamentsGrid from "@/components/TournamentsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Tournament } from "@/models/Tournament";
import styled from "styled-components";

const MainWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;

export default function TournamentsPage({tournaments}) {
    return (
        <>
            <MainWrapper>
                <Header />
                <Center>
                    <Title>All competitions</Title>
                    <TournamentsGrid tournaments={tournaments} />
                </Center>
                <Footer />
            </MainWrapper>
        </>
        
    );
};

export async function getServerSideProps() {
    await mongooseConnect();

    const tournaments = await Tournament.find({}, null, {sort: {'_id': -1}});
    return {
        props:{
            tournaments: JSON.parse(JSON.stringify(tournaments)),
        }
    };
    
};

