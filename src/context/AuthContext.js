import { createContext, useEffect, useReducer } from 'react'

const initial_state = {
   // user: localStorage.getItem("user") !== undefined ? JSON.stringify(localStorage.getItem("user")) : null,
   // user: localStorage.getItem("user") !== undefined ? localStorage.getItem("user") : null,
   user: localStorage.getItem("user") !== null ? JSON.parse(localStorage.getItem("user")) : null,
   accessToken:localStorage.getItem("accessToken") !== null ? JSON.parse(localStorage.getItem("accessToken")) : null,
   loading: false,
   error: null
}

export const AuthContext = createContext(initial_state)

const AuthReducer = (state, action) => {
   switch (action.type) {
      case 'LOGIN_START':
         return {
            user: null,
            loading: true,
            error: null,
            accessToken:null
         }
      case 'LOGIN_SUCCESS':
         return {
            user: action.payload,
            loading: false,
            error: null,
            accessToken:action.token
         }
      case 'LOGIN_FAILURE':
         return {
            user: null,
            loading: false,
            error: action.payload,
            accessToken:null
         }
      case 'REGISTER_SUCCESS':
         return {
            user: null,
            loading: false,
            error: null,
            accessToken:null
         }
      case 'LOGOUT':
         return {
            user: null,
            loading: false,
            error: null,
            accessToken:null
         }

      default:
         return state
   }
}


export const AuthProvider = ({ children }) => {

   const [state, dispatch] = useReducer(AuthReducer, initial_state)

   useEffect(() => {
      localStorage.setItem("user", JSON.stringify(state.user))
      localStorage.setItem("accessToken", JSON.stringify(state.accessToken))
   }, [state.user,state.accessToken])

   return <AuthContext.Provider value={{
      user: state.user,
      loading: state.loading,
      error: state.error,
      accessToken:state.accessToken,
      dispatch,
   }}>
      {children}
   </AuthContext.Provider>
}