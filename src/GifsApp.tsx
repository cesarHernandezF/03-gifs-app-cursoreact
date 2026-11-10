import { GifsList } from "./gifs/components/GifsList"
import { PreviousSearches } from "./gifs/components/PreviousSearches"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { useGifs } from "./gifs/hooks/useGifs";

export const GifsApp = () => {

    const { previusTerms, previusGifts, handleSearch, handleTermClicked } = useGifs();

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el Gif perfecto" />

            {/* Search */}
            <SearchBar placeholder={"Busca 2"} onQuery={handleSearch} />

            {/* Búsquedas previas */}
            <PreviousSearches searches={previusTerms} onLabelClicked={handleTermClicked} />

            {/* Gifs */}
            <GifsList gifs={previusGifts} />
        </>
    )
}
