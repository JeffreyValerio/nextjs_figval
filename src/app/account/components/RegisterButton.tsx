'use client'

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const RegisterButton = () => {
  const searchParams = useSearchParams()
  const destination = searchParams.get('p') || '/'

  return (
    <div className="text-center mx-auto max-w-[400px]">
      <h2 className="text-[24px] font-bold mb-[15px] tracking-[-0.05em] uppercase">Soy nuevo</h2>
      <p className="text-[14px] mb-[30px]">Crear una cuenta tiene muchos beneficios: pagar más rápido, mantener más de una dirección, rastrear pedidos y más.</p>
      <Link href={`/account/register?p=${destination}`}
        className="px-4 py-2 bg-black text-white">Crear una cuenta</Link>
    </div>
  )
}

export default RegisterButton