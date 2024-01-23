import { configureStore } from '@reduxjs/toolkit';
import { AdminLoginSlice } from '../slices/auth/login';
import { UserSlice } from '../slices/user/user';

 const store = configureStore({
  reducer: {
    adminLogin:AdminLoginSlice.reducer,   
    user:UserSlice.reducer,
    
  }
})



export default store;