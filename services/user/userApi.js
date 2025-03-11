
const { kuarmoniaApi } = require("../kuarmonia");

const adminApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // get all admins
    getUsers: builder.query({
      query: () => ({
        url: "/admins",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    // get an admin
    getUser: builder.query({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    // update an admin
    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admins/${id}`,
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // delete an admin
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admins/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      invalidatesTags: [
        "User",
        "Cart",
        "Rent",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),
  }),
});


export const {
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetUserQuery,
  useDeleteUserMutation,
} = adminApi;
