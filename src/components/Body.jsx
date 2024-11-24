import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = ({ showProfile = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector(store => store.user);

    const getProfile = async () => {
        if (userData) return null;
        try {
            const response = await axios.get("http://localhost:3000/user/profile", {
                withCredentials: true,
            });
            dispatch(addUser(response.data)); // Pass the actual data to your Redux action
        } catch (error) {
            navigate("/login");
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div className="static">
            <Header showProfile={showProfile} />
            <Outlet />
            <Footer />
        </div>
    );
};
export default Body;