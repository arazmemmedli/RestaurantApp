import React, { SyntheticEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { setAuthor } from '../redux/reducers/authSlice';

const Login = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPasword] = useState('');
    const [error, setError] = useState<boolean>(false);
    const isInvalid = password === '' || emailAddress === '';
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        const authData = {
            email: emailAddress,
            password: password
        }
        e.preventDefault();
        if (emailAddress === "algoritma@gmail.com" && password === "algoritma2022") {
            dispatch(setAuthor(authData));
            navigate("/")
        } else {
            return;
        }
    }

    return (
        <div className="flex login_bg items-center justify-center relative bg-cover bg-center bg-no-repeat w-full min-h-[100vh]">
            <div className="flex max-w-md w-full flex-col items-center bg-white p-4 border border-solid border-gray-primary rounded mb-4">
                <h1 className="flex justify-center w-full mb-3">
                    <img src="/images/logo-dark.png" alt="Logo" className="mt-2 max-w-[300px] mb-4" />
                </h1>
                {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
                <div className="w-full block">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input aria-label="Enter your email address" value={emailAddress} type="email" name="email" id="email" onChange={(e) => setEmailAddress(e.target.value)} placeholder="Email address" className="block w-full text-base font-normal rounded-md text-[#333] mb-3 outline-none py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <input aria-label="Enter your password" value={password} type="password" name="password" id="password" onChange={(e) => setPasword(e.target.value)} placeholder="Password" className="block w-full text-base outline-none font-normal mr-3 rounded-md mb-3 text-[#333] py-3 px-7 min-h-[50px] bg-[#f6f6f6]" />
                        <button disabled={isInvalid} type="submit" className={`bg-[#176CA6] text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}>Log In</button>
                        {error && <p className='text-[red] mt-2 text-center'>Invalid Credentials</p>}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;