import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import Logo from '../components/Logo';
import { apiService } from '../api/client';
import { toast } from 'react-toastify';


const Login: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const authToken = localStorage.getItem("blogger-api-auth-token");
        console.log(authToken)
        if (authToken) {
            navigate('/dashboard'); // This stays the same
            window.location.hash = '#/dashboard'; // Force it manually for WordPress
        }
    }, [navigate]);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: object) => {
        const tid = toast.loading("Loging In...")
        const res = await apiService.Login(data)
        if (res.success) {
            toast.update(tid, { render: "Redirecting ..", type: "success", isLoading: false, autoClose: 500 });
            localStorage.setItem("blogger-api-auth-token", res.token);
            navigate('/dashboard')
        } else {
            toast.update(tid, { render: res.message, type: "error", isLoading: false, autoClose: 1000 });

        }
    };
    return (
        <form className='flex-1 flex flex-col justify-center  items-center  ' onSubmit={handleSubmit(onSubmit)} >
            <div className='p-1 flex flex-col gap-2 max-w-[450px] mx-auto  w-full'>
                <div className='mb-6 flex items-center justify-center'>
                    <Logo size={300} />
                </div>
                <div className='mb-6'>
                    <h1 className='text-2xl font-semibold '>Log in to your account</h1>

                </div>

                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1 w-full '>
                        <label className='text-sm' >Enter your email</label>
                        <div className='relative  w-full' >

                            <input className={`input w-full`} data-error={errors.email && true} placeholder='jhondoe@gmail.com'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email format' }
                                })}
                            />

                        </div>
                        {
                            errors.email && <p className='text-sm font-semibold text-red-500'>{errors.email.message as string}</p>
                        }
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm'>Enter your password</label>
                        <div className='relative  w-full' >

                            <input className='input w-full' data-error={errors.password && true} type='password' placeholder='●●●●●●●'
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: { value: 6, message: 'Password must be at least 6 characters' }
                                })}

                            />
                        </div>
                        {
                            errors.password && <p className='text-sm font-semibold text-red-500'>{errors.password.message as string}</p>
                        }
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <Button>
                            Login
                        </Button>
                        {/* <Link to={'/auth/forgot-password'} className='underline text-sm font-semibold mt-2' >Forgot Password?</Link> */}
                    </div>
                    <p className='sm:text-center text-sm mt-2'>Don't have an account? <Link to={'/auth/register'} className='underline text-sm font-semibold' >Sign Up</Link></p>


                </div>
            </div>

        </form>
    )
}


export default Login
