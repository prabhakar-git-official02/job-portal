import { useEffect } from "react"
import { authThunk } from "../Thunks/authThunk"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function PrivateLogin({ children }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(authThunk())
    }, [dispatch])

    const user = useSelector((state) => state.auth.user)

useEffect(() => {
        if(!user && !sessionStorage.getItem("AuthProvider")){
        return navigate('/login')
    }
    return children
},[user,dispatch,children,navigate])
}

export default PrivateLogin
