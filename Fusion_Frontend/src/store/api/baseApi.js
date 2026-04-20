import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {API_BASE_URL, STORAGE_KEYS} from '../../utility/constant'

const baseQuery = fetchBaseQuery({
    baseUrl: API_BASE_URL + "/api",
    prepareHeaders:(headers, {getState})=>{
        const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
        if(token){
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithAuth = async (args, api, extraOptions) => 
    {
        const result = await baseQuery(args, api, extraOptions);

        return result;
    
    };

export const baseApi = createApi({
    reducerPath:"api",
    baseQuery: baseQueryWithAuth,
    tagTypes:["menuitem"],
    endpoints:()=>({})

})    