import React from 'react'
import { Outlet } from 'react-router-dom'
import { notesApiSlice } from '../notes/notesApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import {store} from '../../app/store'
import { useEffect } from 'react'

const Prefetch = () => {
    
    useEffect(() => {
        console.log(`subscribing`)
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

        return () => {
            console.log(`unsubscribing`)
            notes.unsubscribe()
            users.unsubscribe()
        }

    }, [])

    return <Outlet />
}

export default Prefetch