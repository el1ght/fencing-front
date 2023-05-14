import Center from "@/components/Center";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Tournament } from "@/models/Tournament";
import styled from "styled-components";

const ImageWrapper = styled.div`
    position: relative;
    max-height: 65vh;
    overflow: hidden;
    display: flex;
    background-color: #000;
    
    img{
        height: 60vh;
        
        
    }
`;

const ImageBox = styled.div`
    flex-grow: 1;

`;

const Heading = styled.h2`
    font-size: 2rem;
    
    font-weight: 600;
    margin: 0 0 20px;
`;

const Descr = styled.p`
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Times New Roman", serif;
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 40px;
    padding-bottom: 100px;
`;

const LeftWrapper = styled.div`
    margin-top: 30px;
    color: #450a0a;
`;
const RightWrapper = styled.div`
    margin-top: 30px;
    border-left: 1px solid #991b1b;
    padding-left: 45px;
    color: #991b1b;
    font-weight: 600;
`;

const SecondHeading = styled.h3`
    margin: 0 0 10px;
    
`;

const Countdown = styled.h3`
    position: absolute;
    z-index: 50;
    bottom: -200px;
    right: 0;
    color: #fff7ed;
    font-size: 10rem;
`;

const MainWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;

const Date = styled.h2`
    font-size: 1.75rem;
    font-family: "Times New Roman", serif;
    font-weight: 600;
    margin: 50px 0 0;
`;


export default function TournamentPage({tournament}) {
    return (
        <>
            <MainWrapper>
                <Header />
                <ImageWrapper>

                    {tournament.images.map(image => (
                        <ImageBox key={image}>
                            <img src={image} />
                        </ImageBox>
                    ))}
                    <Countdown>{tournament.date}</Countdown>
                </ImageWrapper>
                <Center>
                    <ContentWrapper>
                        <LeftWrapper>
                            <Heading>{tournament.title}</Heading>
                            <Descr>{tournament.description}</Descr>
                            <Date>Date: {tournament.date}</Date>
                        </LeftWrapper>
                        <RightWrapper>
                            <SecondHeading>Participants:</SecondHeading>
                            <div>1. Yamada Masaru</div>
                            <div>2. Kong Man Wai Vivian</div>
                            <div>3. Popescu Ana Maria</div>
                            <div>4. Candassamy Marie-Florence</div>
                            <div>5. Reizlin Igor</div>
                            <div>6. Santarelli Andrea</div>
                            <div>7. Choi Injeong</div>
                            <div>8. Siklosi Gergely</div>
                            <div>9. Limardo Gascon Ruben</div>
                            <div>10. Romain Cannone</div>
                            <div>11. Sun Yiwen</div>
                            <div>12. Katrina Lewis</div>
                            <div>13. Edoardo Mangiarotti</div>
                            <div>14. Aladár Gerevich</div>
                        </RightWrapper>
                    </ContentWrapper>
                </Center>
                <Footer />
            </MainWrapper>
        </>
    );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  const {id} = context.query;
  const tournament = await Tournament.findById(id);
  return {
    props: {
      tournament: JSON.parse(JSON.stringify(tournament)),
    }
  }
}

