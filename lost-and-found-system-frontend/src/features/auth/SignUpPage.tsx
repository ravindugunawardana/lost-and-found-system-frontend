import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { signupApi } from "../../api/authService";
import { useNavigate } from "react-router-dom";

type Form = {
    fullName: string | undefined,
    username: string,
    password: string,
    confirm: string,
    contactNumber: string | undefined,
    role: string | undefined,
    isActive: string | undefined,
    createdAt: string | undefined
}

const schema = yup.object({
    fullName: yup.string().optional(),
    username: yup.string().required('Username required'),
    password: yup.string().min(4, 'Min 4 chars').required('Password required'),
    confirm: yup.string().required('Confirm password required').oneOf([yup.ref('password')], 'Passwords must match'),
    contactNumber: yup.string().optional(),
    role: yup.string().optional(),
    isActive: yup.string().optional(),
    createdAt: yup.string().optional()
}).required()

// type Form = yup.InferType<typeof schema>

export default function SignUpPage() {
    const { register, handleSubmit, formState:{ errors, isSubmitting } } =
    useForm<Form>({ resolver: yupResolver(schema) })
    const navigate = useNavigate()

const onSubmit = async (vals: Form) => {
    try {
        await signupApi({
            fullName: vals.fullName,
            username: vals.username,
            password: vals.password,
            confirm: vals.confirm,
            contactNumber: vals.contactNumber,
            role: vals.role,
            isActive: vals.isActive,
            createdAt: vals.createdAt
        })
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
            <label className="block text-sm">Full Name</label>
            <input {...register('fullName')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.fullName?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Username*</label>
            <input {...register('username')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.username?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Password*</label>
            <input type="password" {...register('password')} className="w-full p-2 border rounded" />
            <p className="text-sm text-red-600">{errors.password?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Confirm Password*</label>
            <input type="password" {...register('confirm')} className="w-full p-2 border rounded" />
            <p className="text-sm text-red-600">{errors.confirm?.message as string}</p>
        </div>

        <div>
            <label className="block text-sm">Contact Number</label>
            <input {...register('contactNumber')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.contactNumber?.message as string}</p>
        </div>

                <div>
            <label className="block text-sm">Role</label>
            <input {...register('role')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.role?.message as string}</p>
        </div>

                <div>
            <label className="block text-sm">Is Active</label>
            <input {...register('isActive')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.isActive?.message as string}</p>
        </div>

                <div>
            <label className="block text-sm">Created At</label>
            <input {...register('createdAt')} className="w-full p-2  border rounded" />
            <p className="text-sm text-red-600">{errors.createdAt?.message as string}</p>
        </div>

        <div>
            <button type="submit" disabled={isSubmitting} className="w-full p-2 bg-green-600 text-white">Sign Up</button>
        </div>
    </form>
</div>
)

}