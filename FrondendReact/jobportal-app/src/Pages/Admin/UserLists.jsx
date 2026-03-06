import { allUsers_Get } from "../../Thunks/adminGetReqThunk"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"

function UserLists(){

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allUsers_Get())
    },[dispatch])

    const Users = useSelector(state => state.allUsers.Users)

    console.log(Users)

    return(
        <h1>Users Lists</h1>
    )
}

export default UserLists