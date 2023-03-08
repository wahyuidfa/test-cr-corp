import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
interface pokemon {
    name: string;
    url: string;
}

const Home = () => {
    const router = useRouter()
    return (
        <>
            <Head>Pokemon Go</Head>{" "}
            <div className=' w-full p-5 flex  '>
              <div className="w-40 h-40 shadow-md border m-auto text-center" onClick={()=> router.push("/pokemonEndpoint")}>Pokemon List Menggunakan Endpoit</div>
              <div className="w-40 h-40 shadow-md border  m-auto text-center"  onClick={()=> router.push("/pokemonGraphql")}>Pokemon List Menggunakan Graphql</div>
            </div>
        </>
    );
};

export default Home;

