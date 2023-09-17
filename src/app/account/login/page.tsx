import type { Metadata } from 'next'

import { Title } from '@/components'
import LoginCredentials from '../components/LoginCredentials'
import RegisterButton from '../components/RegisterButton'
import ButtonProviders from '../components/ButtonProviders'

export const metadata: Metadata = {
    title: 'Inicia sesión ',
    description: 'Página de inicio de sesión',
}

const LoginPage = () => {
    return (
        <section className='flex flex-col justify-center items-center py-10 px-2'>
            <div className='flex justify-center'>
                <Title className='text-center'>Inicia sesión</Title>
            </div>

            <div className="flex flex-col justify-center items-center gap-y-4 mb-8 w-full">
                {/* NEXTAUTH CREDENTIALS */}
                <LoginCredentials />

                {/* NEXTAUTH PROVIDERS */}
                <ButtonProviders text="Inicia Sesión" />
            </div>

            <RegisterButton />
        </section>
    )
}

export default LoginPage