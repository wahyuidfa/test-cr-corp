import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface PokemonData {
    name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: {
        type: {
            name: string;
        };
    }[];
    abilities: {
        ability: {
            name: string;
        };
    }[];
    species: {
        name: string;
    };
}

const PokemonDetails = () => {
    const router = useRouter();
    const { name } = router.query;

    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const response = await axios.get<PokemonData>(
                    `https://pokeapi.co/api/v2/pokemon/${name}`
                );
                setPokemonData(response.data);
                console.log(response);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        if (name) {
            fetchPokemonData();
        }
    }, [name]);

    if (loading || !pokemonData) {
        return <div>Loading...</div>;
    }

    return (
        <div className='w-full p-5'>
            <div className='m-auto w-52 border border-black items-center shadow-lg rounded-lg text-center'>
                <img
                    className='m-auto'
                    src={pokemonData.sprites.front_default}
                    alt={pokemonData.name}
                />
                <div className='bg-stone-500 rounded'>
                    <h2>{pokemonData.name}</h2>
                    <p>Height: {pokemonData.height}</p>
                    <p>Weight: {pokemonData.weight}</p>
                    <p>Types: {pokemonData.types.map((type) => type.type.name).join(", ")}</p>
                    <p>Spesies: {pokemonData.species.name}</p>
                    <div>
                        Ability:{" "}
                        {pokemonData.abilities.map((ab, i) => (
                            <p key={i}>{ab.ability.name}</p>
                        ))}
                    </div>
                </div>
                <button onClick={() => router.push("/")}>Back to Dashboard</button>
            </div>
        </div>
    );
};

export default PokemonDetails;
