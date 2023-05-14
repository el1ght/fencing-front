import { createContext, useEffect, useState } from "react";

export const FollowedContext = createContext({});

export function FollowedContextProvider({children}) {
    const ls = typeof window !== "undefined" ? window.localStorage : null;
    const [followedTournaments, setFollowedTournaments] = useState([]);
    useEffect(() => {
        if (followedTournaments?.length > 0) {
            ls?.setItem('followed', JSON.stringify(followedTournaments));
        }
    }, [followedTournaments]);
    useEffect(() => {
        if (ls && ls.getItem('followed')) {
            setFollowedTournaments(JSON.parse(ls.getItem('followed')));
        }
    }, []);

    function addTournament(tournamentId) {
        if (!followedTournaments.includes(tournamentId)) {
            setFollowedTournaments(prev => [...prev, tournamentId]);
        }
    }
    function removeTournament(tournamentId) {
        setFollowedTournaments(prev => {
            const pos = prev.indexOf(tournamentId);
            if (pos !== -1) {
                return prev.filter((value, index) => index !== pos);
            }
            return prev;
        });
    }
    function clearFollowed() {
        setFollowedTournaments([]);
    }
    return (
        <FollowedContext.Provider value={{followedTournaments, setFollowedTournaments, addTournament, removeTournament, clearFollowed}}>
            {children}
        </FollowedContext.Provider>
    );
}
