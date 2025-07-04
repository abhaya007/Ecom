import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  username: '',
  email: '',
  token: '',
  isLoggedIn: false,
  role: '',
}
export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logoutUser: state => {
    return initialState   
   },
    addLoginDetails: (state, action) => {
      //debugger;
      const {token, isLoggedIn} = action.payload
      const { username, email, role, _id } = action.payload.user
      return {
        ...state,
        username:username,
        email: email,
        token: token,
        isLoggedIn: isLoggedIn,
        role: role,
        _id: _id
      }
    }
  }
})

export const { logoutUser, addLoginDetails } = userSlice.actions

export default userSlice.reducer