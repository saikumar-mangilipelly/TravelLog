import { useForm } from 'react-hook-form'
import { BsShieldLockFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import login1 from '../../Assests/login1.svg'
import './Login.css'
import { login } from '../../redux/actions';

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    let dispatch = useDispatch()
    const navigate = useNavigate()
    // localStorage.clear()
    const { issuccess} = useSelector(state => state.loginReducer)
    const onSubmit = (loginuserdata) => {
      dispatch(login(loginuserdata))
    }
    if (issuccess===true)
        navigate('/maps')
    return (
        <div className="login">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-9 col-xl-8 col-11 col-sm-9 col-md-7">
                    <div className="card text-black lcard" style={{ borderRadius: "25px" }}>
                        <div className="card-body lcardbody">
                            <div className="row justify-content-center logingap">
                                <div className="col-md-11 col-lg-6 col-xl-6 col-sm-10 col-11 order-2 order-md-3">
                                    <p className="text-center mb-5 lname">Login</p>
                                    <form className="mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><FaUserCircle /></i>
                                                <input type="text" className="form-control" placeholder='Your Name' {...register("username", { required: true })} />
                                            </span>
                                            {errors.username?.type === 'required' && <p className='text-danger ms-5 fs-6 font-monoscope fw-normal'>* Username required</p>}
                                        </div>
                                        <div className='mb-4'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><BsShieldLockFill /></i>
                                                <input type="password" className="form-control" placeholder='Password' {...register("password", { required: true })} />
                                            </span>
                                            {errors.password?.type === 'required' && <p className='text-danger ms-5 fs-6 font-monoscope fw-normal'>* password required</p>}
                                        </div>
                                        <button type="submit" className="btn btn-dark d-block mx-auto mb-2">Login</button>
                                    </form>
                                </div>
                                <div className="col-md-6 col-sm-6 col-lg-4 col-xl-4 d-flex align-items-center order-1 order-lg-2">
                                    <img src={login1} width='350px'
                                        className="img-fluid d-none d-sm-block" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='order-2 footername'>
                            <p className="text-center fw-normal mb-4">Don't Have an account? <Link to='/signup'
                                className="fw-bolder text-body"><u>Signup here</u></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;