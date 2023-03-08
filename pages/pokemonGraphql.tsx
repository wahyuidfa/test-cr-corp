import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

function PokemonListGraphql({ pokemon, pagination }: any) {
    const { page, limit, totalData } = pagination;
    const totalPages = Math.ceil(totalData / limit);
    const pokemonList = pokemon.data.pokemon_v2_pokemon
    const router = useRouter();
    console.log('====================================');
    console.log(pokemon);
    console.log('====================================');

    return (
        <>
            <Head>Pokemon Go</Head>{" "}
            <div className=' w-full p-5 '>
                <table className='m-auto w-11/12 border shadow-xl p-2 rounded-xl '>
                    <thead className='border-b-gray-500 '>
                        <tr>
                            <th>Name</th>
                           
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemonList.map((pokemon: any) => (
                            <tr
                                className='cursor-pointer border text-center hover:bg-gray-50'
                                onClick={() => router.push(`/detailPokemon/${pokemon.name}`)}
                                key={pokemon.name}>
                                <td>{pokemon.name}</td>
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
                    <div>
                        {page > 1 &&
                            <Link href={`?page=${page - 1}`}>
                                <div>Previous</div>
                            </Link>
                        }

                        {page <= totalPages &&
                            <Link href={`?page=${page + 1}`}>
                                <div>Next</div>
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default PokemonListGraphql

export const getServerSideProps = async ({ query }: any) => {
    let headers: any = {};

    const page = query.page ? parseInt(query.page as string) : 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    headers['Content-Type'] = 'application/json'

    let graphql = JSON.stringify({
        query: `{
            pokemon_v2_pokemon(limit: ${limit}, order_by: {name: asc, is_default: asc, id: asc, height: asc, base_experience: asc, order: asc, pokemon_species_id: asc, weight: asc}, offset: ${offset}) {
            name,
            id,
            
            }
        }`
    })

    let requestOption = {
        method: 'POST',
        headers: headers,
        body: graphql
    }

    const data = await fetch("https://beta.pokeapi.co/graphql/v1beta", requestOption).then((res) => res.json())
    const pokemon = await data

    return {
        props: {
            pokemon,
            pagination: {
                page,
                limit,
                totalData: 10 // jumlah total data yang akan ditampilkan
            }
        }
    }

}