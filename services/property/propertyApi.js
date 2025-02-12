const { kuarmoniaApi } = require("../kuarmonia");

const propertyApi = kuarmoniaApi.injectEndpoints({
  endpoints: (builder) => ({
    addProperty: builder.mutation({
      query: (body) => ({
        url: "/property/",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "Property",
      
      ],
    }),

    getPropertys: builder.query({
      query: ({ page = 1, limit = 7, search = "", userId }) => ({
        url: `/property/?page=${page}&limit=${limit}&search=${search}&userId=${userId}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
    }),

    getProperty: builder.query({
      query: (id) => ({
        url: `/property/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getAllPropertys: builder.query({
      query: ({ page = 1, limit = 8 }) => ({
        url: `/property/?page=${page}&limit=${limit}`,
        method: "GET",
        params: { type: "client" }, 
      }),
      providesTags: ["Property", "Tag", "User","Category"],
    }),


    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `/property/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
  
      invalidatesTags: [
        "User",
        "Category",
        "Tag",
        "Like",
        "Comment",
        "view",
      ],
    }),
 
    updateProperty: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/property/${id}`,
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          body: data,
        };
      },
    }),
    
  }),

 
});

export const {
  useAddPropertyMutation,
  useGetPropertysQuery,
  useGetAllPropertysQuery,
  useDeletePropertyMutation,
  useGetPropertyQuery,
  useUpdatePropertyMutation,
} = propertyApi;
