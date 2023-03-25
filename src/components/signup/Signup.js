import './Singup.css'
import signup1 from '../../Assests/signup1.svg'
import { BsFillShieldLockFill } from "react-icons/bs";
import { useForm } from 'react-hook-form'
import { FaUserCircle, FaFingerprint } from "react-icons/fa";
import { ImMail4 } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import axios from 'axios';
function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    localStorage.clear()
    const onSubmit = (signupuserdata) => {
        axios.post('/user/register', signupuserdata)
            .then(response => {
                if (response.data.message === "User Created Successfully") {
                    toast.success(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: false,                    
                        draggable: true,
                        theme: "colored",
                    })
                    navigate('/login')
                }
                else {
                    toast.warn(response.data.message, {
                        position: "top-center",
                        autoClose: 2000,
                        closeOnClick: true,
                        pauseOnHover: false,                        
                        draggable: true,
                        theme: "colored",
                    })
                }
            })
            .catch(error => console.log(error))
    }
    return (
        <div className="sign">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-10 col-xl-9 col-md-8 col-sm-9 col-11">
                    <div className="card text-black scard" style={{ borderRadius: "25px" }}>
                        <div className="card-body scardbody">
                            <div className="row justify-content-center signupgap">
                                <div className="col-md-10 col-lg-5 col-xl-5 col-sm-10 col-11 order-2 order-md-3">
                                    <p className="text-center fw-bold mb-4 sname">Sign up</p>
                                    <form className="mx-md-4" onSubmit={handleSubmit(onSubmit)}>
                                        <div className='mb-3'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><FaUserCircle /></i>
                                                <input type="text" className="form-control" placeholder='Your Name' {...register("username", { required: true })} />
                                            </span>
                                            {errors.username?.type === 'required' && <p className='text-danger ms-5 fs-6 font-monoscope fw-normal'>* Username required</p>}
                                        </div>
                                        <div className='mb-3'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><ImMail4 /></i>
                                                <input type="email" className="form-control" placeholder='Your Email' {...register("email", { required: true })} />
                                            </span>
                                            {errors.email?.type === 'required' && <p className='text-danger ms-5 fs-6 font-monoscope fw-normal'>* email required</p>}
                                        </div>
                                        <div className='mb-4'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><FaFingerprint /></i>
                                                <input type="password" className="form-control" placeholder='Password' {...register("password", { required: true })} />
                                            </span>
                                            {errors.password?.type === 'required' && <p className='text-danger ms-5 fs-6 font-monoscope fw-normal'>* password required</p>}
                                        </div>
                                        <div className='mb-3'>
                                            <span className="d-flex flex-row align-items-center">
                                                <i className='fs-4 me-3'><BsFillShieldLockFill /></i>
                                                <input type="password" className="form-control" placeholder='Conform Password' {...register("confrompass", { required: true })} />
                                            </span>
                                            {errors.confrompass?.type === 'required' && <p className='text-danger fs-6 font-monoscope ms-5 fw-normal'>* check password</p>}
                                        </div>
                                        <div className="form-check d-flex justify-content-center mb-4">
                                            <input className="form-check-input me-2" type="checkbox" value="" id="t&c" />
                                            <label className="form-check-label" for="t&c">
                                                I agree all statements in <a href="#!" className="fw-bold text-body"><u>Terms of service</u></a>
                                            </label>
                                        </div>
                                        <button type="submit" className="btn btn-dark d-block mx-auto mb-2">Register</button>
                                    </form>
                                </div>
                                <div className="col-md-6 col-lg-5 col-sm-7 col-xl-5 d-flex align-items-center order-1 order-lg-2">
                                    <img src={signup1}
                                        className="img-fluid d-none d-sm-block" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className='order-2'>
                            <p className="text-center fw-normal mb-4">already Have an account? <Link to='/login'
                                className="fw-bolder text-body"><u>Login here</u></Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;