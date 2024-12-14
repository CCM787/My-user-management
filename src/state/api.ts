// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { User } from "../types/common";

// export const userApi = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/" }),
//   tagTypes: ["Users"],
//   endpoints: (builder) => ({
//     getUsers: builder.query<User[], void>({
//       query: () => "users",
//       providesTags: ["Users"],
//     }),
//     getUserById: builder.query<User, number>({
//       query: (id) => {
//         console.log("RTK Query request:", `users/${id}`);
//         return `users/${id}`;
//       },
//     }),
//     addUser: builder.mutation<void, Partial<User>>({
//       query: (newUser) => ({
//         url: "users",
//         method: "POST",
//         body: { id: Date.now(), ...newUser },
//       }),
//       invalidatesTags: ["Users"],
//     }),
//   }),
// });

// export const { useGetUsersQuery, useGetUserByIdQuery, useAddUserMutation } =
//   userApi;
