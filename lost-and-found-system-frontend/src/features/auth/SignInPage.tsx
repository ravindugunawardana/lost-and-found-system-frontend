import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/authService";
import { useAuth } from "../../auth/AuthContext";

type FormValues = { username: string; password: string; }

const schema = yup.object({
    username: yup.string().required('Username is required'),
    password: yup.string().min(4, 'Minimum 4 chars').required('Password required')
}).required()

export default function SignInPage(){
    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<FormValues>({ resolver: yupResolver(schema) })
    const navigate = useNavigate()
    const { login } = useAuth()

    const onSubmit = async (vals: FormValues) => {
        try {
            const data = await loginApi(vals)
            if(data?.accessToken) {
                login(data.accessToken)
                navigate('/dashboard')
            }
        } catch (e: any){
            alert(e.response?.data?.message || 'Login failed')
        }
    }

    return(
        <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4"> SignIn </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm"> Username </label>
                    <input {...register('username')} className="w-full p-2 border rounded" />
                    <p className="text-sm text-red-600"> {errors.password?.message as string} </p>
                </div>
                <div>
                    <button type="submit"  disabled={isSubmitting} className="w-full p-2 bg-blue-600 text-white rounded"> SignIn </button>
                </div>
            </form>
            <p className="mt-4 text-sm"> Don't have an account? <a href="/signup" className="text-blue-600"> SignUp </a></p>
        </div>
    )
}