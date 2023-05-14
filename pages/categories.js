import Header from "@/components/Header";
import Center from "@/components/Center";
import {Category} from "@/models/Category";
import {Tournament} from "@/models/Tournament";
import TournamentBox from "@/components/TournamentBox";
import styled from "styled-components";
import Link from "next/link";
import {mongooseConnect} from "@/lib/mongoose";
import Title from "@/components/Title";
import Footer from "@/components/Footer";

const CategoryGrid = styled.div`
    display: grid;
    gap: 20px;
    margin-bottom: 60px;
`;

const CategoryTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    color: #450a0a;
    h2 {
        margin: 20px 0;
        font-size: 1.7rem;
    }
    a {
        font-weight: 600;
        color: #991b1b;
    }
`;

export default function CategoriesPage({mainCategories, categoriesTournaments}) {
    return (
        <>
            <Header />
            <Center>
                <div>
                <Title>All Categories</Title>
                </div>
                
                {mainCategories.map(cat => (
                        
                        <div key={cat._id}>
                            
                            <CategoryTitle>
                                <h2>{cat.name}</h2>
                                <div>
                                    <Link href={'/category/'+cat._id}>Show all</Link>
                                </div>
                            </CategoryTitle>
                            <CategoryGrid>
                                {categoriesTournaments[cat._id].map(p => (
                                    <TournamentBox key={p._id} {...p} />
                                ))}
                            </CategoryGrid>
                        </div>
                ))}
            </Center>
            <Footer />
        </>
    );
};

export async function getServerSideProps() {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter(c => c.parent);
  const categoriesTournaments = {}; // catId => [tournaments]
  const allFetchedTournamentsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter(c => c?.parent?.toString() === mainCatId)
      .map(c => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const tournaments = await Tournament.find({category: categoriesIds}, null, {limit:3,sort:{'_id':-1}});
    allFetchedTournamentsId.push(...tournaments.map(p => p._id.toString()))
    categoriesTournaments[mainCat._id] = tournaments;
  }


  return {
    props: {
      mainCategories: JSON.parse(
        JSON.stringify(mainCategories)
      ),
      categoriesTournaments: JSON.parse(JSON.stringify(categoriesTournaments)),

    },
  };
}

