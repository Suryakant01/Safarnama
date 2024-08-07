import React from 'react'
import Cards from '../components/Card.components'
import { Card } from 'react-bootstrap'
import { useFirebase } from '../context/firebase.context'

const StateBlogs = () => {
    const firebase = useFirebase

    return (
        <>
        <h1>All Blogs here </h1>
        {/* <Cards />  */}
        </>
    )
}

export default StateBlogs
