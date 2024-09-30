// import React, { useState } from "react";
// import UserTable from "./UserTable"; 
// import UserForm from "./FormComponent"; 

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [editUserId, setEditUserId] = useState(null);

//   // Handling submition for both updting and deleting...
//   const handleFormSubmit = (user) => {
//     if (editUserId) {
//       // Update existing user
//       setUsers(users.map((u) => (u.id === editUserId ? { ...user, id: editUserId } : u)));
//       setEditUserId(null); // Reset the edit mode
//     } else {
//       // Add a new user
//       setUsers([...users, { ...user, id: Date.now() }]);
//     }
//   };

//   // const updateData = (id) => {
//   //   setEditUserId(id);
//   // };

//   // const deleteData = (id) => {
//   //   setUsers(users.filter((user) => user.id !== id));
//   // };

//   return (
//     <div>
//       <UserForm 
//         onFormSubmit={handleFormSubmit} 
//         editUser={users.find((user) => user.id === editUserId)} 
//       />
//       <UserTable 
//         userList={users} 
//         setEditUserId = {setEditUserId}
//         deleteData={deleteData} 
//       />
//     </div>
//   );
// };

// export default UserManagement;
