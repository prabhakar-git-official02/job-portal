import { useEffect } from "react"
import { authThunk } from "../Thunks/authThunk"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { showAlert } from "../Scripts/Alert"

function PrivateLogin({ children }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authThunk())
    }, [dispatch])

    const user = useSelector((state) => state.auth.user)
     

    if(!user || !sessionStorage.getItem("AuthProvider")) {
        console.log("Error","User not Logged!","error")
           return navigate('/login')
        } else {
            return user?.authProvider === sessionStorage.getItem("AuthProvider") ? children : navigate('/login')
        }
    

}

export default PrivateLogin
