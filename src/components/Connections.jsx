import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import ConnectionsCard from './ConnectionsCard'

const Connections = () => {
    const dispatch = useDispatch()
    const connectedUsers = useSelector(store => store.feed)
    
    
    
        const getConnectedUsers = async()=>{
            const users = await axios.get("http://localhost:3000/user/requests/connections",{withCredentials:true})
           
            dispatch(addFeed(users.data))
            
        }
        
   
    
    useEffect(()=>{
        getConnectedUsers()
    },[])
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Your Connections</h1>
      <ConnectionsCard connections={connectedUsers} />
    </div>
  )
}

export default Connections