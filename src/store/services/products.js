import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const productServiceApi = createApi({
  reducerPath: "productService",
  baseQuery,
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    productsList: builder.query({
      query: ({ category }) => ({
        url: `products`,
        method: "GET",
        params: category && category !== "all" ? { category } : {},
      }),
      providesTags: ["Products"],
    }),
    productById: builder.query({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});
export const { useProductsListQuery, useProductByIdQuery } = productServiceApi;
