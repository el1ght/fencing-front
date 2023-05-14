import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import TournamentsGrid from "@/components/TournamentsGrid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import {debounce} from "lodash";

const SearchInput = styled(Input)`
    margin-top: 100px;
    font-size: 1.4rem;
    margin-bottom: 40px;
    position: sticky;
    top: 80px;
    z-index: 60;
`;

export default function SearchPage() {
    const [phrase, setPhrase] = useState('');
    const [tournaments, setTournaments] = useState([]);
    const debouncedSearch = useCallback(
        debounce(searchTournaments, 500), []
    );
    useEffect(() => {
        if (phrase.length > 0) {
            debouncedSearch(phrase);
        } else {
            setTournaments([]);
        }
    }, [phrase]);
    function searchTournaments(phrase) {
        axios.get('/api/tournaments?phrase='+encodeURIComponent(phrase))
            .then(response => {
                setTournaments(response.data);
            });
    }
    return (
        <>
            <Header />
            <Center>
                <SearchInput 
                    autoFocus 
                    value={phrase} 
                    onChange={ev => setPhrase(ev.target.value)} 
                    placeholder="Search for tournaments" 
                />
                {phrase !== '' && tournaments.length === 0 && (
                    <h2>No tournaments found for query "{phrase}"</h2>
                )}
                <TournamentsGrid tournaments={tournaments} />
            </Center>
        </>
    );
};
