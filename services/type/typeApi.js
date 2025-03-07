import { kuarmoniaApi } from "../kuarmonia";

const typeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addType: builder.mutation({
      query: (body) => ({
        url: "/type/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "User",
        "Property",
        "Type",
      ],
    }),

    GetTypes: builder.query({
      query: ({ page = 1, limit = 5, search = "" } = {}) => ({
        url: `/type/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["Type"],
    }),



    updateType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/type/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Type"],
    }),
  }),
});

export const {
  useAddTypeMutation,
  useGetTypesQuery,
  useUpdateTypeMutation,
} = typeApi;
