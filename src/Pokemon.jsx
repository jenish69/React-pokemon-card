import { useEffect, useState } from "react";
import { PokemonCard } from "./PokemonCard";

export const Pokemon = () => {

    const API = "https://pokeapi.co/api/v2/pokemon?limit=600";
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");

    const fectchPokemon = async () => {
        try {
            const res = await fetch(API);
            const data =await res.json();

            const detailPokemonData = data.results.map(async (curPokemon) => {
                const res = await fetch(curPokemon.url);
                const data =await res.json();
                return data;
        });

            const detailResponse = await Promise.all(detailPokemonData);
            setPokemon(detailResponse);
            setLoading (false);

        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(error);
        }
    }
       

    useEffect(() => {
        fectchPokemon();
    }, []);


    const searchData = pokemon.filter((curPokemon) =>
        curPokemon.name.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return (
            <div>
                <h1>Loading....</h1>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h1>{error.message}</h1>
            </div>
        );
    }
console.log(pokemon[0]);

    return (
        <>
            <section className="container">
                <header>
                    <h1> Lets Catch Pokémon</h1>
                </header>
                <div className="pokemon-search">
                    <input
                        type="text"
                        placeholder="search Pokemon"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div>
                    <ul className="cards">
                        {
                            searchData.map((curPokemon) => {
                                return (
                                    <PokemonCard key={curPokemon.id} pokemonData={curPokemon}/>
                                );
                            })
                        }
                    </ul>
                </div>
            </section>
        </>
    );
}
