import { useEffect } from "react";
import UserCard from "../components/UserCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useState } from "react";

const Feed = () => {
  const dispatch = useDispatch();
  const [currentIndex, setcurrentIndex] = useState(0);
  const users = useSelector((store) => store.feed);
 

  const allUsers = async () => {
    try {
      const feedOfUsers = await axios.get("http://localhost:3000/user/feed", {
        withCredentials: true,
      });
      

      dispatch(addFeed(feedOfUsers.data));
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  useEffect(() => {
    allUsers();
  }, []);
  const handleAction = async (status, id) => {
    await axios.post(
      "http://localhost:3000/request/send/" + status + "/" + id,
      {},
      { withCredentials: true }
    );
    setcurrentIndex((previndex) => previndex + 1);
  
    
  };

  // Add a loading state to handle the UI while data is being fetched
  if (!users || users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      {users[currentIndex] ? (
        <UserCard user={users[currentIndex]} onAction={handleAction} />
      ) : (
        <div>No user to display</div>
      )}
    </div>
  );
};

export default Feed;
