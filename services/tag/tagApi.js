const { kuarmoniaApi } = require("../kuarmonia");

const tagApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTag: builder.mutation({
      query: (body) => ({
        url: "/tag/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "Rent",
        "User",
        "Cart",
        "Favorite",
        "Purchase",
        "Review",
      ],
    }),

    GetTags: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/tag/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
    }),

    getTagsForDropDownMenu: builder.query({
      query: () => ({
        url: "/tag/",
        method: "GET",
        params: { type: "dropdown" }, 
      }),
      providesTags: ["TagDropdown"], 
    }),
    getTag: builder.query({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),

      providesTags: ["User"],
    }),

    updateTag: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tag/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Tag"],
    }),
  }),
});
export const {
  useAddTagMutation,
  useGetTagsQuery,
  useGetTagQuery, 
  useGetTagsForDropDownMenuQuery,
  useUpdateTagMutation,
} = tagApi;
