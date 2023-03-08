import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
interface pokemon {
    name: string;
    url: string;
}
const PokemonList = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {


        const fetchPokemonData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(currentPage - 1) * 10}`
                );
                setPokemonData(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 50));
                setLoading(false);
                console.log(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPokemonData();
    }, [currentPage]);

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div>Loading ....</div>;
    }
    return (
        <>
            <Head>Pokemon Go</Head>{" "}
            <div className=' w-full p-5 '>
                <table className='m-auto w-11/12 border shadow-xl p-2 rounded-xl '>
                    <thead className='border-b-gray-500 '>
                        <tr>
                            <th>Name</th>
                            <th>URL</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonData.map((pokemon: pokemon) => (
                            <tr
                                className='cursor-pointer border text-center hover:bg-gray-50'
                                onClick={() => router.push(`/detailPokemon/${pokemon.name}`)}
                                key={pokemon.name}>
                                <td>{pokemon.name}</td>
                                <td>{pokemon.url}</td>
                                <td>
                                    <img
                                        className='w-10 h-10 m-auto'
                                        src={`https://img.pokemondb.net/artwork/${pokemon.name}.jpg`}
                                        alt={pokemon.name}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className='flex justify-center gap-1 pt-2'>
                    {Array.from(Array(totalPages), (e, i) => {
                        const pageNumber = i + 1;
                        return (
                            <button
                                className='bg-gray-400 w-10'
                                key={pageNumber}
                                onClick={() => handlePageClick(pageNumber)}>
                                {pageNumber}
                            </button>
                        );
                    })}
                </div>
                <div className="border bg-slate-600 w-1/4 m-auto text-center text-white" onClick={() => router.push("/")}>Back To Dashboard</div>
            </div>
        </>
    );
};

export default PokemonList;

