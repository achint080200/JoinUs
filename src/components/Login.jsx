import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [firstName,setFirstName] = useState("")
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const [toggleName,settoggleName] = useState("login")
  const [isLoginFrom,setisLoginFrom] = useState(true)

  

  const loginToWesbite = async (event) => {
  
    
    if (!emailId || !password ) {
      seterror("Email and Password are required");
      return;
    }
   
      try {
        const loginDetails = await axios.post(
          "http://localhost:3000/login",
          {
            emailId,
            password,
          },
          { withCredentials: true }
        );
        console.log(loginDetails.data);
        
        
        if (loginDetails.data._id) {
          dispatch(addUser(loginDetails.data));
          return navigate("/");
        }
        seterror(loginDetails.data)
      } catch (error) {
        console.log(error.message);
        
        
      }

    }
    
 
  const signUpWebsite = async (event) => {
    
    
    if (!emailId || !password || !firstName) {
      seterror("Email,Password and firstName are required");
      return;
    }
   
      try {
        const signUpDetails = await axios.post(
                "http://localhost:3000/signup",
                {
                  FirstName:firstName,
                  emailId,
                  password,
                },
                { withCredentials: true }
              );
              
        
        
        dispatch(addUser(signUpDetails.data));
        return navigate("/profile");
        
     
      } catch (error) {
        seterror(signUpDetails.data)
        
        
      }

  }
  return (
    <div className="flex justify-center ">
      <div className="card bg-base-100 w-96 shadow-xl border border-white ">
        <div className="card-body">
          <h1 className="flex justify-center text-3xl font-semibold text-zinc">{isLoginFrom ? "Login" : "Sign Up"}</h1>
          {!isLoginFrom && (<label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">First Name</span>
            </div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </label>)}
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Email Id</span>
            </div>
            <input
              type="text"
              placeholder="Email Id"
              value={emailId}
              onChange={(e) => {
                setemailId(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className="input input-bordered w-full max-w-xs"
            />
          </label>

          <div className="card-actions flex flex-col  items-center">
            <p>{error}</p>
            <button
              onClick={isLoginFrom ? loginToWesbite : signUpWebsite}
              className="btn btn-primary w-[30%] mt-2 "
            >
              {isLoginFrom ? "Login" : "Sign Up" }
            </button>
            <p>{isLoginFrom ? "Don't have an account?" : "Alredy a user?" }<span 
            className=" cursor-pointer "
            onClick={()=>{
              setisLoginFrom((value)=>!value)
              
            }}>{isLoginFrom ? "Sign Up Now." : "Log In now."}</span> </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
