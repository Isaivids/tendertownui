// import React, { useState } from "react";
// import { Button } from "primereact/button";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "../../store/store";
// import { addUser } from "../../store/slice/user";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [searchString, setSearchString] = useState();
//   const navigate = useNavigate();
//   const dispatch = useDispatch<AppDispatch>();
//   const userDetails = useSelector((state: any) => state.userDetails);
//   const handleLogin = () => {
//     const body: any = {
//       table: username,
//       admin: false,
//     };
//     console.log(body);

//     // dispatch(addUser(body));
//     // if(!userDetails.body.loading && !userDetails.body.error){
//     //   navigate('/list/aeb49182-dceb-4d78-be69-31852e778525')
//     // }
//   };

//   const LoginComp = () => {
//     return (
//       <div className="flex flex-column gap-3 bg-white border-round-md p-3">
//         {/* <span className="text-center scy">Login as Guest</span> */}
//         <div className="flex flex-column gap-1">
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             value={searchString}
//             onChange={(e: any) => setSearchString(e.target.value)}
//           />
//         </div>
//         {/* <div className="flex justify-content-center">
//           <Button label="Login" icon="pi pi-sign-in" onClick={handleLogin} />
//         </div> */}
//       </div>
//     );
//   };

//   return (
//     <div className="flex justify-content-center align-items-center pmy h-screen	">
//       <LoginComp />
//     </div>
//   );
// };

// export default Login;

// Import necessary dependencies
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { addUser } from "../../store/slice/user";
import { useNavigate } from "react-router-dom";

// Define the Login component
const Login:any = () => {
  // State to manage form data
  const [username, setUsername] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const userDetails = useSelector((state: any) => state.userDetails);
  const navigate = useNavigate();
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const body: any = {
      table: username,
      admin: false,
    };
    console.log(body);
    dispatch(addUser(body))
    if(!userDetails.body.loading && !userDetails.body.error){
      navigate('/list/all')
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
