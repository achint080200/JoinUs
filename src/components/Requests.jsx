import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest } from '../utils/requestSlice'
import RequestsCard from './RequestsCard'

const Requests = () => {
    const dispatch = useDispatch()
    const requests   = useSelector(store => store.request)
    const requestsUsers = async () => {
        const requestedUser = await axios.get("http://localhost:3000/user/requests/recieved",
            {withCredentials : true}
        )
      
        dispatch(addRequest(requestedUser.data))

        
    }
    useEffect(()=>{
        requestsUsers()

    },[])
  return (
    <div className="container mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Requests You’ve Received</h1>
      <RequestsCard requests={requests} />
    </div>
  )
}

export default Requests