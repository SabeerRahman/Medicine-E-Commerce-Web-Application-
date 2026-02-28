import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseQuery";

export const adminServiceApi = createApi({
  reducerPath: "adminService",
  baseQuery,
  tagTypes: ["Admin", "Products"],
  endpoints: (builder) => ({
    // Auth
    adminLogin: builder.mutation({
      query: (credentials) => ({
        url: `admin/auth/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    adminLogout: builder.mutation({
      query: () => ({
        url: `admin/auth/logout`,
        method: "POST",
      }),
    }),
    adminMe: builder.query({
      query: () => ({
        url: `admin/auth/me`,
        method: "GET",
      }),
    }),

    // Dashboard
    statsList: builder.query({
      query: () => ({
        url: `admin/dashboard/stats`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),
    productCountByCategory: builder.query({
      query: () => ({
        url: `admin/dashboard/products/count-by-category`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // Admin Products
    adminProductsList: builder.query({
      query: (params) => ({
        url: `products`,
        method: "GET",
        params,
      }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `products`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products", "Admin"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Products", "Admin"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Admin"],
    }),
  }),
});

export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useAdminMeQuery,
  useStatsListQuery,
  useProductCountByCategoryQuery,
  useAdminProductsListQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = adminServiceApi;