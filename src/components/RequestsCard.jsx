import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/requestSlice';

const RequestsCard = ({ requests }) => {
    const dispatch = useDispatch()
    const handleAccept = async (status, id) => {
        try {
         
          await axios.post(`http://localhost:3000/request/review/${status}/${id}`, {}, { withCredentials: true });
          dispatch(removeRequest(id));
        } catch (error) {
          console.error("Error accepting request:", error);
        }
      };
      
      const handleReject = async (status, id) => {
        try {
        
          await axios.post(`http://localhost:3000/request/review/${status}/${id}`);
          dispatch(removeRequest(id));
        } catch (error) {
          console.error("Error rejecting request:", error);
        }
      };
    
    if (!requests || requests.length === 0) {
      return <p className="text-gray-500">No requests received.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((request) => (
          <div
            key={request._id} // Assuming each request has a unique `_id`
            className="relative w-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300"
          >
            {/* User Image */}
            <div className="h-[50vh] bg-gray-200">
              <img
                src={request?.photoUrl}
                alt={`${request?.firstName}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
  
            {/* User Information */}
            <div className="p-4">
              <h2 className="text-lg font-bold">{request?.FirstName}</h2>
              <p className="text-gray-700 text-sm mt-2">{request?.about}</p>
            </div>
  
            {/* Action Buttons */}
            <div className="flex justify-around p-4 border-t border-gray-300">
              {/* Accept Button */}
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                onClick={() => handleAccept("accepted",request?._id)}
              >
                Accept
              </button>
  
              {/* Reject Button */}
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                onClick={() => handleReject("rejected",request?._id)}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  // Placeholder functions for actions
  
export default RequestsCard