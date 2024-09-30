import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import FormComponent from "./FormComponent";
import UserTable from "./UserTable";
import { useSelector, useDispatch } from "react-redux";
import { addUser, updateUser, setEditUser, resetEditUser } from "./userSlice";

const App = () => {
  const { users, editUser, btnClass, userName } = useSelector(state => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (newUser) => {
    if (editUser) {
      dispatch(updateUser(newUser));
      dispatch(resetEditUser());
    } else {
      dispatch(addUser(newUser));
    }
    navigate("/UserTable");
  };

  return (
    <div className="container mt-5">
      <Routes>
        <Route
          path="/"
          element={
            <FormComponent
              onFormSubmit={handleFormSubmit}
              editUser={editUser}
              btnClass={btnClass}
            />
          }
        />
        <Route
          path="/UserTable"
          element={<UserTable userName={userName} />}
        />
      </Routes>
    </div>
  );
};

export default App;













// import React, { useState, useEffect } from "react";
// import FormComponent from "./FormComponent";
// import UserTable from "./UserTable";
// import { Routes, Route } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

// const App = () => {
//   const [users, setUsers] = useState([]);
//   const [editUser, setEditUser] = useState(null);
//   const [btnClass, setBtnClass] = useState("btn-primary");
//   const [userName, setUserName] = useState(); // userState hook for User-Name Filter
//   const NavigateTo = useNavigate(); // Navigate hook for render the submit button to userTable...
//   // console.log(userName);

//   // for the storing the data in localStorage.....
//   useEffect(() => {
//     const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
//     setUsers(storedUsers);
//     // console.log(storedUsers);
//   }, []);
//   // For handling formSubmit....
//   const handleFormSubmit = (newUser) => {
//     if (editUser) {
//       const updatedUserList = users.map((user) => {
//         if (user.id === editUser.id) {
//           return newUser;
//         }
//         return user;
//       });
//       setUsers(updatedUserList);
//       localStorage.setItem("users", JSON.stringify(updatedUserList));
//       setEditUser(null);
//     } else {
//       const updatedUserList = [...users, newUser];
//       setUsers(updatedUserList);
//       localStorage.setItem("users", JSON.stringify(updatedUserList));
//     }
//     NavigateTo("/UserTable"); // Navigate to userTable page....
//   };

//   // For handling the delete functionality....
//   const handleDelete = (id) => {
//     const updatedUserList = users.filter((user) => user.id !== id);
//     setUsers(updatedUserList);
//     localStorage.setItem("users", JSON.stringify(updatedUserList));
//   };
  
  

//   // For handling the update functionality...
//   const handleUpdate = (user) => {
//     setBtnClass("btn btn-warning");
//     setEditUser(user);
//   };

  
//   const handleStatusChange = (id) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) => {
//         if (user.id === id) {
//           const newStatus = user.status === 1 ? 0 : 1; // Toggle between 1 (active) and 0 (not active)
//           window.alert(
//             `User ${user.name} status changed to ${newStatus === 1 ? 'Active' : 'Not Active'}`
//           );
//           return { ...user, status: newStatus };
//         }
//         return user;
//       })
//     );
//   };

//   // const handleFormSubmit = (newUser) => {
//   //   const updatedUserList = [...users, newUser];
//   //   setUsers(updatedUserList);
//   //   localStorage.setItem('users', JSON.stringify(updatedUserList));
//   // };

//   return (
//     <>
//       <div className="container mt-5">
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <FormComponent
//                 onFormSubmit={handleFormSubmit}
//                 editUser={editUser}
//                 btnClass={btnClass}
//                 setBtnClass={setBtnClass}
//               />
//             }
//           />
//           <Route
//             path="/UserTable"
//             element={
//               <UserTable
//                 userList={users}
//                 deleteData={handleDelete}
//                 updateData={handleUpdate}
//                 userName={userName}
//                 setUserName={setUserName}
//                 handleStatusChange={handleStatusChange}
//               />
//             }
//           />
//         </Routes>
//         {/*UserState hook and function calling of FormComponent*/}
//         {/* <FormComponent
//         onFormSubmit={handleFormSubmit}
//         editUser={editUser}
//         btnClass={btnClass}
//         setBtnClass={setBtnClass}
//       /> */}
//         {/*UserState hook and function calling of UserTable*/}
//         {/* <UserTable
//         userList={users}
//         deleteData={handleDelete}
//         updateData={handleUpdate}
//         userName={userName}
//         setUserName={setUserName}
//       /> */}
//       </div>
//     </>
//   );
// };

// export default App;
