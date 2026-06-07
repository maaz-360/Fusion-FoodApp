import { baseApi } from "./baseApi";

export const menuItemApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({    //create all endpoints here:=>       
        getMenuItems: builder.query({
            query: () => "/menuitem",
            providesTags: ["menuitem"],
            transformResponse: (respone) => {
                if (respone && respone.result && Array.isArray(respone.result)) {
                    return respone.result;
                }
                if (respone && Array.isArray(respone)) {
                    return respone;
                }

                return [];
            }
        }),

        getMenuItemById: builder.query({
            query: (id) => `/menuitem/${id}`,
            providesTags: (result, error, { id }) => [{ type: "menuitem", id }],
            transformResponse: (response) => {
                if (response && response.result) {
                    return response.result;
                }
                return response;
            },
        }),

        createMenuItem: builder.mutation({
            query: (formData) => ({
                url: "/menuitem",
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["menuitem"],
        }),

        updateMenuItem: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/menuitem/${id}`,
                method: "PUT",
                body: formData,

            }),
            invalidatesTags: (result, error, { id }) => [{ type: "menuitem", id }],
        }),

        deleteMenuItem: builder.mutation({
            query: (id) => ({
                url: `/menuitem?id=${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["menuitem"],
        }),


    })
})

export const { useGetMenuItemsQuery, useCreateMenuItemMutation, useDeleteMenuItemMutation, useUpdateMenuItemMutation, useGetMenuItemByIdQuery } = menuItemApi;