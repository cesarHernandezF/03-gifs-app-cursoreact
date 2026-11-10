import { useRef, useState } from "react";
import type { Gif } from "../interfaces/gif.interface";
import { getGifsByQuery } from "../actions/get-gifs-by-query.actions";

/*
//Se puede sacar del ciclo de vida para que no se pierda la info en cada renderización,
//si es que no es necesario que este adentro
const gifsCache: Record<string, Gif[]> = {};*/

export const useGifs = () => {
    const [previusTerms, setPreviousTerms] = useState<string[]>([]);
    const [previusGifts, setPreviousGifts] = useState<Gif[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        //Si ya esta se muestran los que ya tenemos
        if (gifsCache.current[term]) {
            setPreviousGifts(gifsCache.current[term]);
            return;
        }

        const gifs = await getGifsByQuery(term);
        setPreviousGifts(gifs);
        gifsCache.current[term] = gifs;
    };

    const handleSearch = async (query: string = '') => {
        query = query.toLowerCase().trim();
        if (query.length === 0) return;
        if (previusTerms.includes(query)) return;
        setPreviousTerms([query, ...previusTerms].splice(0, 8));

        const gifs = await getGifsByQuery(query);
        setPreviousGifts(gifs);

        gifsCache.current[query] = gifs;

        //console.log(gifsCache);
    };


    return {
        //Properties
        previusTerms,
        previusGifts,
        //Methods / Actions
        handleTermClicked,
        handleSearch
    }
}
