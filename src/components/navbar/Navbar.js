import { GoThreeBars } from "react-icons/go";
import { useSelector,useDispatch } from 'react-redux'
import {NavLink ,useNavigate} from 'react-router-dom'
import { MdLogout } from "react-icons/md";
import { fetchData, logout } from "../../redux/actions";
import './Navbar.css'
import { useEffect } from "react";
function Navbar() {
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let { issuccess,username} = useSelector(state => state.loginReducer)
    useEffect(()=>{
        dispatch(fetchData())
    },[])
    const onlogout=()=>{
        localStorage.clear()
        dispatch(logout())
        navigate('/login')
    }
    return (
        <div className='header'>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <NavLink className="logo" to='/'>TRAVELLOG</NavLink>
                    <button className="navbar-toggler navbtn" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="toggler"><GoThreeBars /></span>
                    </button>
                    {issuccess ?
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link navhead" to='/myreviews'>MyReviews</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link navhead" to='/maps'>Map</NavLink>
                                </li>
                                <li className="nav-item">            
                                    <button className="btn btn-none fs-5" onClick={onlogout}>{username}<i><MdLogout/></i></button>
                                </li>
                            </ul>
                        </div> :
                        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink className="nav-link navhead" aria-current="page" to='/'>Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link navhead" to='/signup'>signup</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link navhead" to='/login'>Login</NavLink>
                                </li>
                            </ul>
                        </div>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar
