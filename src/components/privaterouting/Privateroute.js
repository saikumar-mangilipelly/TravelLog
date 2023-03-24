import { useState, useEffect } from 'react'
import axios from 'axios'
import './Privateroute.css'
import { Outlet, Navigate } from 'react-router-dom'
const Privateroute = () => {
    let [auth, setauth] = useState(null)
    useEffect(() => {
        const verification = async () => {
            let token = localStorage.getItem('token')
            await axios.get('/mappin/privateroute', {
                headers: { Authorization: "Bearer " + token }
            })
                .then(response => {
                    setauth(response.data.message)
                })
                .catch(err => console.log(err))
        }
        verification()
    }, [])
    if (auth === null) {
        return (
            <div className="loader-container text-center">
                <div className='spinner-border text-dark' role="status">
                </div>
            </div>
        )
    }
    else if (auth === "success")
        return <Outlet />
    else {
        localStorage.removeItem('token')
        return <Navigate to='/login' />
    }

}
export default Privateroute
