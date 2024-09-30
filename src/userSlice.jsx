import { createSlice } from '@reduxjs/toolkit';

// Load users from localStorage if available
// const loadUsersFromLocalStorage = () => {
//   try {
//     const users = localStorage.getItem('users');
//     return users ? JSON.parse(users) : [];
//   } catch (e) {
//     console.error('Failed to load users from localStorage:', e);
//     return [];
//   }
// };

const initialState = {
  users: [], // Load from localStorage
  editUser: null,
  userName: '',
  formData: {
    name: "",
    email: "",
    mobile: "",
    organisation: "",
    salary: "",
    reportingManager: "",
    salaryCredit: "",
  },
  btnClass: 'btn-primary', // Default button class
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const { id, ...updatedUser } = action.payload;
      const index = state.users.findIndex(user => user.id === id);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    setEditUser: (state, action) => {
      state.editUser = action.payload;
      state.formData = action.payload; // Set form data from edit user
      state.btnClass = 'btn-warning';
    },
    resetEditUser: (state) => {
      state.editUser = null;
      state.formData = initialState.formData; // Reset form data
      state.btnClass = 'btn-primary';
    },
    toggleUserStatus: (state, action) => {
      const user = state.users.find(user => user.id === action.payload);
      if (user) {
        user.status = user.status === 1 ? 0 : 1;
        window.alert(`User ${user.name} status changed to ${user.status === 1 ? 'Active' : 'Not Active'}`);
        // localStorage.setItem('users', JSON.stringify(state.users));
      }
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload }; // Update form data
    },
  },
});

export const {
  addUser,
  updateUser,
  deleteUser,
  setEditUser,
  resetEditUser,
  toggleUserStatus,
  setUserName,
  setFormData,
} = usersSlice.actions;

export default usersSlice.reducer;
