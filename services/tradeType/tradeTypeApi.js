import { kuarmoniaApi } from "../kuarmonia";

const tradeTypeApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addTradeType: builder.mutation({
      query: (body) => ({
        url: "/tradeType/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body,
      }),
      invalidatesTags: [
        "User",
        "Property",
        "TradeType",
      ],
    }),

    GetTradeTypes: builder.query({
      query: ({ page = 1, limit = 7, search = "" } = {}) => ({
        url: `/tradeType/?page=${page}&limit=${limit}&search=${search}`,
        method: "GET",
      }),
      providesTags: ["TradeType"],
    }),

    GetAllTradeTypes: builder.query({
      query: () => ({
        url: `/tradeType/`,
        method: "GET",
        params: { type: "all" }, 

      }),
      providesTags: ["TradeType"],
    }),


    updateTradeType: builder.mutation({
      query: ({ id, ...formData }) => ({
        url: `/tradeType/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["TradeType"],
    }),
  }),
});

export const {
  useAddTradeTypeMutation,
  useGetTradeTypesQuery,
  useGetAllTradeTypesQuery,
  useUpdateTradeTypeMutation,
} = tradeTypeApi;
