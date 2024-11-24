import React from 'react'

const ConnectionsCard = ({ connections }) => {
    
    
    
    if (!connections || connections.length === 0) {
      return <p className="text-gray-600 text-center">No connections to show.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {connections.map((connection) => (
           
          <div
            key={connection._id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            {/* User Image */}
            <div className="w-full h-[50vh] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={connection?.photoUrl || "https://via.placeholder.com/150"}
                alt={`${connection?.FirstName}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
  
            {/* User Info */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">{connection?.FirstName}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {connection?.about || "No bio available."}
              </p>
            </div>
  
            {/* Action Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              {/* Message Button */}
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                Message
              </button>
              {/* Remove Button */}
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

export default ConnectionsCard