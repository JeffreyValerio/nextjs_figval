'use client'

import { useState } from 'react';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { BiKey } from 'react-icons/bi';

type FormData = {
    identifier: string
    password  : string
}
const LoginCredentials = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()

    const searchParams = useSearchParams()
    const destination = searchParams.get('p') || '/'

    const [showError, setShowError] = useState(false)

    const onLoginUser = async ({ identifier, password }: FormData) => {
        await signIn('credentials', { identifier, password, callbackUrl: destination })
    }

    return (
        <form onSubmit={handleSubmit(onLoginUser)} noValidate
            className="mx-0 p-8 w-full md:w-[400px] shadow-2xl overflow-hidden">

            <h2 className="pb-3 font-semibold uppercase border-b">Clientes registrados</h2>

            <div className="flex flex-col gap-1 pt-4">
                {showError && (
                    <p className="text-red-500">No reconocemos el correo o el usuario</p>
                )}
                <label htmlFor="identifier">Usuario o correo electrónico</label>
                <input id='identifier' className={`border px-2 py-1 ${errors.identifier ? 'border-red-600' : ''}`}
                    {...register('identifier', {
                        required: 'Este campo es requerido', minLength: {
                            value: 2,
                            message: 'Mínimo 2 caracteres'
                        }
                    })} aria-invalid={errors.identifier ? 'true' : 'false'} type="text"
                    placeholder='Severus Snape' />
                {errors.identifier && (
                    <p className="text-red-500">{errors.identifier?.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-1 pt-4">
                <label aria-required htmlFor="password">Contraseña</label>
                <input id='password' className={`border px-2 py-1 ${errors.password ? 'border-red-600' : ''}`}
                    {...register('password', {
                        required: 'Este campo es requerido', minLength: {
                            value: 6,
                            message: 'Mínimo 6 caracteres'
                        }
                    })} type="password" placeholder='******' />
                {errors.password && (
                    <p className="text-red-500">{errors.password?.message}</p>
                )}
            </div>

            <div className="flex flex-col gap-2 pt-4">
                <button type='submit' className="px-2 py-1 bg-black/90 text-white flex items-center justify-center gap-1"
                    disabled={showError ? true : false}>
                    <BiKey className="w-5 h-5" /> Ingresar
                </button>
                <Link href={'/recover'} className="text-blue-600">Olvidé mi contraseña</Link>
            </div>

        </form>
    )
}

export default LoginCredentials