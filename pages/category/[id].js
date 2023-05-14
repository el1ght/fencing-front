import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import TournamentsGrid from "@/components/TournamentsGrid";
import { Category } from "@/models/Category";
import { Tournament } from "@/models/Tournament";
import axios from "axios";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import { useEffect, useState } from "react";
import styled from "styled-components";

const CategoryHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 50px;
    margin-bottom: 15px;
    
`;

const TitleWrapper = styled.div`
    min-width: 200px;
`;

const FiltersWrapper = styled.div`
    display: flex;
    margin-top: 75px;
    align-items: center;    
    color: #450a0a;
    gap: 15px;
    flex-wrap: wrap;
    justify-content:end;
    span {
        font-family: "Times New Roman", serif;
        font-weight: 500;
    }
`;

const Filter = styled.div`
    background-color: #FFDEB5;
    padding: 5px 10px;
    border-radius: 5px;
    display: flex;
    gap: 5px;
    

    select{
        background-color: transparent;
        border: 0;
        font-size: 1.1rem;
        color: #991b1b;
    }
    select:focus{
        outline: none;
    }
`;

const NoTournaments = styled.h2`
font-size: 1.3rem;
    font-weight: 600;
`;

export default function CategoryPage({
  category,subCategories,tournaments:originalTournaments
}) {
  const defaultSorting = '_id-desc';
  const defaultFilterValues = category.properties
    .map(p => ({name:p.name,value:'all'}));
  const [tournaments,setTournaments] = useState(originalTournaments);
  const [filtersValues,setFiltersValues] = useState(defaultFilterValues);
  const [sort,setSort] = useState(defaultSorting);
  const [loadingTournaments,setLoadingTournaments] = useState(false);
  const [filtersChanged,setFiltersChanged] = useState(false);

  function handleFilterChange(filterName, filterValue) {
    setFiltersValues(prev => {
      return prev.map(p => ({
        name:p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFiltersChanged(true);
  }
  useEffect(() => {
    if (!filtersChanged) {
      return;
    }
    setLoadingTournaments(true);
    const catIds = [category._id, ...(subCategories?.map(c => c._id) || [])];
    const params = new URLSearchParams;
    params.set('categories', catIds.join(','));
    params.set('sort', sort);
    filtersValues.forEach(f => {
      if (f.value !== 'all') {
        params.set(f.name, f.value);
      }
    });
    const url = `/api/tournaments?` + params.toString();
    axios.get(url).then(res => {
      setTournaments(res.data);
      setLoadingTournaments(false);
    })
  }, [filtersValues, sort, filtersChanged]);
  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <TitleWrapper>
          <Title>{category.name}</Title>
          </TitleWrapper>
        
          <FiltersWrapper>
            {category.properties.map(prop => (
              <Filter key={prop.name}>
                <span>{prop.name}:</span>
                <select
                  onChange={ev => handleFilterChange(prop.name, ev.target.value)}
                  value={filtersValues.find(f => f.name === prop.name).value}>
                  <option value="all">All</option>
                  {prop.values.map(val => (
                    <option key={val} value={val}>{val}</option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={ev => {
                  setSort(ev.target.value);
                  setFiltersChanged(true);
                }}>
                <option value="_id-desc">newest first</option>
                <option value="_id-asc">oldest first</option>
              </select>
            </Filter>
          </FiltersWrapper>
        </CategoryHeader>
        {!loadingTournaments && (
          <div>
            {tournaments.length > 0 && (
              <TournamentsGrid tournaments={tournaments} />
            )}
            {tournaments.length === 0 && (
              <NoTournaments>Sorry, no tournaments found</NoTournaments>
            )}
          </div>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({parent:category._id});
  const catIds = [category._id, ...subCategories.map(c => c._id)];
  const tournaments = await Tournament.find({category:catIds});
  return {
    props:{
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      tournaments: JSON.parse(JSON.stringify(tournaments)),
    }
  };
}