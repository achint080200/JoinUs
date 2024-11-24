import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const { FirstName, age, about, emailId, skills, photoUrl } = user;

  const [firstName, setFirstName] = useState(FirstName);
  const [userAge, setUserAge] = useState(age);
  const [userAbout, setUserAbout] = useState(about);
  const [userSkills, setUserSkills] = useState(skills);
  const [previewUrl, setPreviewUrl] = useState(photoUrl);
  const [manualUrl, setManualUrl] = useState(photoUrl);
  const [loading, setLoading] = useState(false); // Loading state for the API call
  const [error, setError] = useState(null); // Error state for handling issues
  const [toast,settoast] = useState(false)
  const dispatch = useDispatch()

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  const handleManualUrlChange = (e) => {
    const url = e.target.value;
    setManualUrl(url);
    setPreviewUrl(url); // Update the preview as the user types
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh

    try {
      const updatedUser =await axios.patch(
        "http://localhost:3000/profile/update",
        {
          FirstName: firstName,
          age: userAge,
          skills: userSkills,
          photoUrl: manualUrl,
          about: userAbout,
        },
        { withCredentials: true }
      );
     
      dispatch(addUser(updatedUser?.data))
      
      settoast(true)
      setTimeout(()=>{
        settoast(false)
      },1000)
      
    } catch (err) {
      console.error(
        "Error updating profile:",
        err.response?.data || err.message
      );
      setError(err.response?.data);
    }
  };

  return (
    user && (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg border border-gray-300">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Photo Preview */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">
              <img
                src={previewUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <label className="text-blue-500 cursor-pointer mt-2">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* Manual URL Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Profile Image URL</label>
            <input
              type="text"
              value={manualUrl}
              onChange={handleManualUrlChange}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter image URL"
            />
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              value={userAge}
              onChange={(e) => setUserAge(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="Enter your age"
            />
          </div>

          {/* About */}
          <div className="mb-4">
            <label className="block text-gray-700">About</label>
            <textarea
              value={userAbout}
              onChange={(e) => setUserAbout(e.target.value)}
              className="w-full mt-1 p-2 border rounded-md"
              rows={4}
              placeholder="Write something about yourself"
            ></textarea>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <label className="block text-gray-700">Skills</label>
            <input
              type="text"
              value={userSkills}
              onChange={(e) => setUserSkills(e.target.value.split(","))} // Convert to array on change
              className="w-full mt-1 p-2 border rounded-md"
              placeholder="e.g., JavaScript, React, Node.js"
            />
          </div>

          {/* Save Button */}
          <div className=" ">
            <p className="text-red-600 ">{error}</p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600  "
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
        { toast && (<div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Update successfully.</span>
          </div>
          
        </div>)}
      </div>
    )
  );
};

export default EditProfile;
