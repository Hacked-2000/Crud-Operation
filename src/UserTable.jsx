import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  setEditUser,
  toggleUserStatus,
  setUserName,
} from "./userSlice";
import { useNavigate } from "react-router-dom";

function fetchUser(userList, startOf = 0, limit = 3) {
  return userList.slice(startOf, startOf + limit);
}

const UserTable = () => {
  const { users, userName } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [startOf, setStartOf] = useState(0);
  const limit = 3;

  // Filter the users based on the search input before pagination
  const filteredUsers = users.filter((user) =>
    userName ? user.name.toLowerCase().includes(userName.toLowerCase()) : true
  );
  const pageUser = fetchUser(filteredUsers, startOf, limit);

  const handleEdit = (user) => {
    dispatch(setEditUser(user));
    navigate("/");
  };

  const previous = () => {
    if (startOf > 0) {
      setStartOf(startOf - limit);
    }
  };

  const forward = () => {
    if (startOf + limit < users.length) {
      setStartOf(startOf + limit);
    }
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const handleImageClick = (file) => {
    if (file instanceof File) {
      setSelectedImage(URL.createObjectURL(file)); // generate temp url
    } else if (typeof file === "string") {
      setSelectedImage(file); // use URl if it is a string
    }
  };
  return (
    <div className="container-fluid mt-5">
      <h2>User List</h2>
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search User"
          aria-label="Search"
          aria-describedby="search-addon"
          value={userName}
          onChange={(e) => {
            dispatch(setUserName(e.target.value));
            setStartOf(0);
          }}
        />
        <span className="btn btn-dark">
          <i className="fa fa-search"></i>
        </span>
      </div>
      <table className="table table-striped table-hover mt-3 table-responsive">
        <thead className="table-light">
          <tr>
            {/* <th className="text-center">Status</th> */}
            <th className="text-center">Name</th>
            <th className="text-center">Email</th>
            <th className="text-center">Mobile</th>
            <th className="text-center">Organisation</th>
            <th className="text-center">salary</th>
            <th className="text-center">Reporting Manager</th>
            <th className="text-center">Salary Credit</th>
            <th className="text-center">Job Mode</th>
            <th className="text-center">Single Statment</th>
            <th className="text-center">Multiple Statment</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {pageUser
            .filter((user) => {
              return userName
                ? user.name.toLowerCase().includes(userName.toLowerCase())
                : true;
            })
            .map((user, index) => (
              <tr key={index}>
                <td className="text-center">{user.name} </td>
                <td className="text-center">{user.email}</td>
                <td className="text-center">{user.mobile}</td>
                <td className="text-center">{user.organisation}</td>
                <td className="text-center">{user.salary}</td>
                <td className="text-center">{user.reportingManager}</td>
                <td className="text-center">{user.salaryCredit}</td>
                <td className="text-center">{user.jobMode}</td>
                
                {/* Uploaded file  Single*/}
                <td className="text-center">
                  {user.statmentUpload ? (
                    <>
                      <img
                        src={
                          user.statmentUpload instanceof File
                            ? URL.createObjectURL(user.statmentUpload)
                            : user.statmentUpload
                        }
                        alt="Uploaded File"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                        onClick={() => handleImageClick(user.statmentUpload)} // When clicked, show the image at the bottom
                      />
                    </>
                  ) : (
                    "No Statement"
                  )}
                </td>

                {/* Uploaded files - Multiple */}
                <td className="text-center">
                  {Array.isArray(user.multipleUpload) &&
                  user.multipleUpload.length > 0
                    ? user.multipleUpload.map((file, index) => {
                        {
                          /* console.log("File:", file); // Add this line to log file content */
                        }
                        return (
                          <div key={index}>
                            {file instanceof File ? (
                              <a
                                href={URL.createObjectURL(file)} // Generate URL for each file object
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>{file.name}</span>{" "}
                                {/* Display the file name */}
                              </a>
                            ) : (
                              <span>Invalid file</span>
                            )}
                          </div>
                        );
                      })
                    : "No Files Uploaded"}
                </td>

                <td>
                  <td>
                    <button
                      className={`btn ${
                        user.status === 1 ? "btn-success" : "btn-danger"
                      }`}
                      onClick={() => dispatch(toggleUserStatus(user.id))}
                    >
                      {user.status === 1 ? (
                        <i className="fa fa-bell"></i>
                      ) : (
                        <i className="fa fa-bell-slash"></i>
                      )}
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger ml-2"
                      onClick={() => dispatch(deleteUser(user.id))}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="btn btn-primary mr-2" onClick={previous}>
        Previous
      </button>
      <button className="btn btn-primary float-right" onClick={forward}>
        Next
      </button>
      
      {/*Renderinrg the image at the buttom of the table */}
      {selectedImage && (
        <div style={{ marginTop: "20px", textAlign: "center", color:"blue", paddingTop:"40px", paddingBottom:"30px"}}>
          <h3>Selected Image</h3>
          <img
            src={selectedImage}
            alt="Selected"
            style={{
              width: "400px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "10px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default UserTable;

// ===========================for upload======================================
// {user.statmentUpload ? (
//   <a
//     href={
//       user.statmentUpload instanceof File
//         ? URL.createObjectURL(user.statmentUpload) // Generate URL for the file object
//         : user.statmentUpload // Assume it's a URL if it's not a File object
//     }
//     target="_blank"
//     rel="noopener noreferrer"
//   >
//     {/* Display the image preview if it's a File object or a valid URL */}
//     <img
//       src={
//         user.statmentUpload instanceof File
//           ? URL.createObjectURL(user.statmentUpload) // Generate a temporary URL for the image file
//           : user.statmentUpload // Use the URL directly if it's a string
//       }
//       alt="Uploaded File"
//       style={{
//         width: "100px",
//         height: "100px",
//         objectFit: "cover",
//       }} // Style the image preview
//     />
//   </a>
// ) : (
//   "No Statement"
// )}

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// // Pagination....
// function fetchUser(userList, startof = 0, limit = 3) {
//   return userList.slice(startof, startof + limit);
// }

// const UserTable = ({
//   userList,
//   updateData,
//   deleteData,
//   setUserName,
//   userName,
//   handleStatusChange,
// }) => {
//   // For the status of active and in active....
//   const [status, setStatus] = useState({});
//   // for the navigation form update to formComponent page...
//   const navigate = useNavigate();
//   const handleEdit = (id) => {
//     updateData(id);
//     navigate("/");
//   };

//   // to set limit in table for 3 data...
//   const [startOf, setStartOf] = useState(0);
//   const limit = 3;
//   const pageUser = fetchUser(userList, startOf, limit);

//   // btn for Piche ane ke lea...
//   const previous = () => {
//     if (startOf > 0) {
//       setStartOf(startOf - limit);
//     }
//   };
//   // btn for Age jane ke lea...
//   const forward = () => {
//     if (startOf + limit < userList.length) {
//       setStartOf(startOf + limit);
//     }
//   };
//   // // btn for deleteing data...
//   // const [data, setData] = useState();
//   // const deleteData = (userList) => {
//   //   setData(data.filter((v, i) => i !== userList));
//   // }
//   // const rows = data.Map((item, userList));
//   return (
//     <div className="mt-5">
//       <h2>User List</h2>
//       {/* Input for searching.... */}
//       <div className="input-group rounded">
//         <input
//           type="search"
//           className="form-control rounded"
//           placeholder="Search"
//           aria-label="Search"
//           aria-describedby="search-addon"
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <span className="btn btn-dark">
//           <i className="fa fa-search"></i>
//         </span>
//       </div>
//       <table className="table table-striped mt-3 w-100">
//         <thead>
//           <tr>
//             <th className="text-center">Status</th>
//             <th className="text-center">Name</th>
//             <th className="text-center">Email</th>
//             <th className="text-center">Mobile</th>
//             <th className="text-center">Organisation</th>
//             <th className="text-center">salary</th>
//             <th className="text-center">Reporting Manager</th>
//             <th className="text-center">Salary Credit</th>
//             <th className="text-center">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {/*Functionality for filter for Name and map the user for updating user in table.... */}
//           {pageUser
//             .filter((user) => {
//               return userName
//                 ? user.name.toLowerCase().includes(userName.toLowerCase())
//                 : true;
//             })
//             .map((user) => (
//               <tr key={user.id}>
//                 {user.status === 1 ? (
//                   <div className="display-5 text-primary pl-4 pt-3">
//                    <i className="fa fa-bell"></i>
//                   </div>
//                 ) : (
//                   <div className="display-5 text-danger pl-4 pt-3">
//                    <i className="fa fa-bell-slash"></i>
//                   </div>
//                 )}
//                 {/* Show status based on binary value */}
//                 <td className="text-center">{user.name} </td>
//                 <td className="text-center">{user.email}</td>
//                 <td className="text-center">{user.mobile}</td>
//                 <td className="text-center">{user.organisation}</td>
//                 <td className="text-center">{user.salary}</td>
//                 <td className="text-center">{user.reportingManager}</td>
//                 <td className="text-center">
//                   {user.salaryCredit}
//                   {/* {user.salaryCredit.account == true ? "Account" : "" }
//         {user.salaryCredit.cheque == true ? "Cheque" : "" }
//         {user.salaryCredit.cash == true ? "Cash" : "" } */}
//                   {/* {typeof user.salaryCredit == 'string' ? user.salaryCredit : "" } */}
//                   {/* {user.salaryCredit.account ? "Account" : ""}
//                   {user.salaryCredit.cheque ? "Cheque" : ""}
//                   {user.salaryCredit.cash ? "Cash" : ""} */}
//                 </td>
//                 <td className="text-center">
//                   <div className="btn-group text-center">
//                     {/*Button for status Active/Not Active.... */}
//                     <a
//                       className="btn btn-primary mr-2"
//                       onClick={() => handleStatusChange(user.id)}
//                     >
//                       <i className="fa fa-hotel"></i>
//                     </a>
//                     {/*Button for Update Data.... */}
//                     <a
//                       href="#form"
//                       className="btn btn-info mr-2"
//                       onClick={() => handleEdit(user)}
//                     >
//                       <i className="fa fa-edit"></i>
//                       {/*Button for Delete Data.... */}
//                     </a>
//                     <a
//                       className="btn btn-danger mr-2"
//                       onClick={() => deleteData(user.id)}
//                     >
//                       <i class="fa fa-trash"></i>
//                     </a>

//                     <br />
//                   </div>
//                 </td>
//               </tr>
//             ))}
//         </tbody>
//       </table>

//       <div className="pb-5">
//         <button
//           className="btn btn-secondary float-left"
//           onClick={previous}
//           disabled={startOf === 0}
//         >
//           Previous
//         </button>
//         <button
//           className="btn btn-secondary  float-right"
//           onClick={forward}
//           disabled={startOf + limit >= userList.length}
//         >
//           Next
//         </button>
//         <br />
//       </div>
//     </div>
//   );
// };

// export default UserTable;
