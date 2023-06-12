import React from 'react';
import {Link, Navigate, useNavigate} from 'react-router-dom';
import AuthImage from '../images/auth-image.jpg';
import AuthDecoration from '../images/auth-decoration.png';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {login} from "../slices/auth";
import * as Yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";
import LogoBip from '../images/marylis/logo.png';
// import { addLocaleData } from "react-intl";
// import locale_en from 'react-intl/locale-data/en';
// import locale_de from 'react-intl/locale-data/de';


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .email('Email is invalid'),
    password: Yup.string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .max(40, 'Password must not exceed 40 characters'),
});

function Signin() {
    const {isLoggedIn} = useSelector((state) => state.auth);
    const {register, handleSubmit, formState: {errors}} = useForm({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });
    // const navigate = useNavigate();
    // addLocaleData([...locale_en, ...locale_de]);


    const dispatch = useDispatch();

    const onFormSubmit = data => {
        dispatch(login(data))
            .unwrap()
            .then(() => {
                // navigate("/profile");
                // window.location.reload();
            })
            .catch(() => {
            });
    }

    const onErrors = errors => console.error(errors);


    if (isLoggedIn) {
        return <Navigate to="/"/>;
    }
    return (
        <main className="bg-white">

            <div className="relative md:flex">

                {/* Content */}
                <div className="md:w-1/2">
                    <div className="min-h-screen h-full flex flex-col after:flex-1">

                        {/* Header */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                                {/* Logo */}
                                <img className="h-12 rounded-full" src={LogoBip}/>
                            </div>
                        </div>

                        <div className="max-w-sm mx-auto px-4 py-8">
                            <h1 className="text-3xl text-slate-800 font-bold mb-6">Welcome back! ✨</h1>
                            {/* Form */}
                            <form onSubmit={handleSubmit(onFormSubmit, onErrors)}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email
                                            Address</label>
                                        <input id="email" name="email" {...register('email')}
                                               className={`form-input w-full ${errors.email?'border-red-500':''}`} type="email"/>
                                        <span
                                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.email?.message}
                                        </span>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1"
                                               htmlFor="password">Password</label>
                                        <input id="password" name="password" {...register('password')}
                                               className={`form-input w-full ${errors.password?'border-red-500':''}`} type="password" autoComplete="on"/>
                                        <span
                                            className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                                            {errors.password?.message}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between mt-6">
                                    <div className="mr-1">
                                        <Link className="text-sm underline hover:no-underline" to="/reset-password">Forgot
                                            Password?</Link>
                                    </div>
                                    <button type="submit"
                                            className="btn bg-primary-500 hover:bg-primary-600 text-white ml-3"
                                            to="/">Sign In
                                    </button>
                                </div>
                            </form>
                            {/* Footer */}
                            <div className="pt-5 mt-6 border-t border-slate-200">
                                <div className="text-sm">
                                    Don’t you have an account? <Link
                                    className="font-medium text-primary-500 hover:text-primary-600" to="/signup">Sign
                                    Up</Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>

                {/* Image */}
                <div className="hidden md:block absolute top-0 bottom-0 right-0 md:w-1/2" aria-hidden="true">
                    <img className="object-cover object-center w-full h-full" src={AuthImage} width="760" height="1024"
                         alt="Authentication"/>
                    <img className="absolute top-1/4 left-0 transform -translate-x-1/2 ml-8 hidden lg:block"
                         src={AuthDecoration} width="218" height="224" alt="Authentication decoration"/>
                </div>

            </div>

        </main>
    );
}

export default Signin;
