import axios from "axios";

const UserCard = ( {user,onAction} ) => {
    
    const handleButtonClick = (status) => {
        onAction(status, _id); // Call the parent handler with the status and user ID
      };
    
    
    const {FirstName,about,age ,photoUrl,_id} = user
    
 
    
    
    
  
    return (
      <div className="relative w-80 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-300 mb-[100px]">
        {/* User Image */}
        <div className="h-[50vh] bg-gray-200">
          <img
            src={photoUrl}
            alt={`${FirstName}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
  
        {/* User Information */}
        <div className="p-4">
          {/* Name and Age */}
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">{FirstName}</h2>
            <span className="text-gray-500 text-sm">{age} years old</span>
          </div>
  
         
  
          {/* Bio */}
          <p className="text-gray-700 text-sm mt-2">{about}</p>
        </div>
  
        {/* Action Buttons */}
        <div className="flex justify-center gap-6 p-4 border-t border-gray-300">
          {/* Reject Button */}
          <button className="w-12 h-12 bg-red-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-red-600"
          onClick={()=>{
            handleButtonClick("ignored",_id)
          }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
  
          {/* Accept Button */}
          <button className="w-12 h-12 bg-green-500 text-white rounded-full shadow-md flex items-center justify-center hover:bg-green-600"
          onClick={()=>{handleButtonClick("interested",_id)}}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  };
  
  export default UserCard;