import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://pokeapi.co/api/v2/';
const ITEM_URL = 'pokemon';
const SPECIES_URL = 'pokemon-species/';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getItemByName: builder.query({
      query: (name: string) => ITEM_URL + `/${name.toLowerCase()}`,
    }),
    getItemList: builder.query({
      query: ({ limit = 10, offset = 0 }) => ITEM_URL + `?limit=${limit}&offset=${offset}`,
    }),
    getItemSpecies: builder.query({
      query: (name: string) => SPECIES_URL + `${name.toLowerCase()}`,
    }),
  }),
});

export const { useGetItemByNameQuery, useGetItemListQuery, useGetItemSpeciesQuery } = api;
