import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name: string) => `pokemon/${name.toLowerCase()}`,
    }),
    getPokemonList: builder.query({
      query: ({ limit = 10, offset = 0 }) => `pokemon?limit=${limit}&offset=${offset}`,
    }),
    getPokemonSpecies: builder.query({
      query: (name: string) => `pokemon-species/${name.toLowerCase()}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery, useGetPokemonListQuery, useGetPokemonSpeciesQuery } = pokemonApi;
