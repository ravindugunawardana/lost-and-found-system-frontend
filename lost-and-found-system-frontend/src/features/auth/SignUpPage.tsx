import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { signupApi } from "../../api/authService";
import { useNavigate } from "react-router-dom";

type Form = { username: string , password: string, confirm: string }

const schema = yup.object({
    username: yup.string().required('Username required'),
    password: yup.string().min(4, 'Min 4 chars').required('Password required'),
    confirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match')
}).required()

export default function SignUpPage(){
    const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm<Form>({ resolver: yupResolver(schema) })
    const navigate = useNavigate()


const onSubmit = async (vals: Form) => {
    try {
        await signupApi({ username: vals.username, password: vals.password })
        alert('SignUp successful. Please sign in')
        navigate('/signin')
    } catch (e: any) {
        alert(e.response?.data?.message || 'Signup failed')
    }
}


return (
<div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
    <h2 className="text-xl font-semibload mb-4"> Sign Up </h2>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        <div>
            <label className="block text-sm">Username</label>
            <input {...register('username')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.password?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Password</label>
            <input type="password" {...register('password')} className="w-full p-2 border rounded" />
            <p className="text-sm text-red-600">{errors.password?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Confirm Password</label>
            <input type="password" {...register('confirm')} className="w-full p-2 border rounded" />
            <p className="text-sm text-red-600">{errors.confirm?.message as string}</p>
        </div>

        <div>
            <button type="submit" disabled={isSubmitting} className="w-full p-2 bg-green-600 text-white">Sign Up</button>
        </div>
    </form>
</div>
)

}