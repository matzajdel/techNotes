import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            //Sprawdzenie czy odpowiedź z serwera jest prawidłowa:
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            //Czas przez który dany będą przechowywane w cache'u:
            keepUnusedDataFor: 5,
            //Przekształcenie danych odebranych z serwera przed zapisaniem ich w store'u
            transformResponse: (responseData) => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids)
                {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                }
                else return [{ type: 'User', id: 'LIST' }]
            }
        })
    }) 
})

export const {
    useGetUsersQuery
} = usersApiSlice

//Query result object:
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select()

//Only entities, ids
const selectUsersData = createSelector(
    selectUsersResult,
    usersResult => usersResult.data
)

export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)


