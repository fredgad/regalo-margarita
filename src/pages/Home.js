import React, { useEffect, useContext } from 'react'
import { Form } from '../components/notes/Form'
import { Alert } from '../components/common/alert/Alert'
import { Notes } from '../components/notes/Notes'
import { Loader } from '../components/common/loader/Loader'
import { FirebaseContext } from '../context/firebase/firebaseContext' 

export const Home = () => {
    const { loading, notes, fetchNotes, removeNote } = useContext(FirebaseContext)
    
    useEffect(() => {
        fetchNotes() 
        // eslint-disable-next-line
    }, [])
    
    return (
        <div className="Home">
            <Alert calendar={false} />  
            <Form />
            {loading
                ? <Loader />
                : <Notes notes={notes} onRemove={removeNote} />
            }
        </div> 
    )
} 