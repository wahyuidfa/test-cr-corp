interface pokemon {
    id: number;
    height: number;
    weight: number;
    name: string;
    imageUrl: string;
    types: any;
}
export const fetchData = async (name: string): Promise<pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json();
    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        imageUrl: data.sprites.front_default,
        types: data.types.map((type: any) => type.type.name),
    };
};
