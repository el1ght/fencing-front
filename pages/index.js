import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewTournaments from "@/components/NewTournaments";
import { mongooseConnect } from "@/lib/mongoose";
import { Tournament } from "@/models/Tournament";
import styled from "styled-components";

const MainWrapper = styled.div`
    min-height: 100%;
    display: flex;
    flex-direction: column;
`;

export default function HomePage({featuredTournament, newTournaments}) {

  return (
    <div>
      <MainWrapper>
        <Header />
        <Featured tournament={featuredTournament} />
        <NewTournaments tournaments={newTournaments} />
        <Footer />
      </MainWrapper>
    </div>
  )
};

export async function getServerSideProps() {
  const featuredTournamentId = '645726130222642f7eca1448';
  await mongooseConnect();
  const featuredTournament = await Tournament.findById(featuredTournamentId);
  const newTournaments = await Tournament.find({}, null, {sort: {'_id': -1}, limit: 5});
  return {
      props: {featuredTournament: JSON.parse(JSON.stringify(featuredTournament)),
      newTournaments: JSON.parse(JSON.stringify(newTournaments)),
    },
  };
};

