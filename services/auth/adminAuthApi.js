const { kuarmoniaApi } = require("../kuarmonia");

const authApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    // ثبت‌نام
    signup: builder.mutation({
      query: (body) => ({
        url: "/admin/signup",
        method: "POST",
        body,
      }),
    }),

    // ورود
    signin: builder.mutation({
      query: (body) => ({
        url: "/admin/signin",
        method: "POST",
        body,
      }),
    }),

    // فراموشی رمز عبور
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/admin/forgot-password",
        method: "POST",
        body,
      }),
    }),

    // بازیابی رمز عبور
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/admin/reset-password",
        method: "POST",
        body,
      }),
    }),

    // دریافت اطلاعات ادمین فعلی (برای حفظ لاگین)
    persistAdmin: builder.query({
      query: () => ({
        url: "/admin/me",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),



    // دریافت لیست ادمین‌ها
    getAdmins: builder.query({
      query: () => ({
        url: "/admin/list",
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // دریافت اطلاعات یک ادمین خاص
    getAdmin: builder.query({
      query: (id) => ({
        url: `/admin/${id}`,
        method: "GET",
      }),
      providesTags: ["Admin"],
    }),

    // حذف ادمین
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin"],
    }),

    // بروزرسانی اطلاعات ادمین
    updateAdmin: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

export const {
  useSignupMutation,
  useSigninMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  usePersistAdminQuery,
  useGetAdminsQuery,
  useGetAdminQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation
} = authApi;
