

const { kuarmoniaApi } = require("../kuarmonia");

const authApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // signup
    signup: builder.mutation({
      query: (body) => ({
        url: "/auth/signup-admin",
        method: "POST",
        body,
      }),

      invalidatesTags: ["User"],
    }),

    // signin
    signin: builder.mutation({
      query: (body) => ({
        url: "/auth/signin-admin",
        method: "POST",
        body,
      }),
    }),

    // forgot password
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body,
      }),
    }),

    // persist user
    persistUser: builder.query({
      query: () => ({
        url: "/auth/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User", "Cart", "Rent", "Favorite", "Purchase", "Review"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  usePersistUserQuery,
} = authApi;
