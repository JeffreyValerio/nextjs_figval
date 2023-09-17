'use client'

import { useEffect, useState } from "react"
import Image from 'next/image'
import { getProviders, signIn } from "next-auth/react"
import { useSearchParams } from 'next/navigation';

interface Props {
    text: string
}

const ButtonProviders = ({ text }: Props) => {

    const searchParams = useSearchParams()
    const destination = searchParams.get('p') || '/'
    const [providers, setProviders] = useState<any>({})

    useEffect(() => {
        getProviders().then(prov => {
            setProviders(prov)
        })
    }, [])

    return (
        <div className="w-full md:w-[400px] h-[66px] flex items-center justify-center p-8 shadow-2xl">
            {Object.values(providers).map((provider: any) => {
                if (provider.id === 'credentials') return <div key={provider.id}></div>
                return (
                    <button className="px-2 py-1 flex items-center justify-between gap-2"
                        key={provider.id}
                        onClick={
                            async () => await signIn(provider.id, {
                                callbackUrl: destination
                            })
                        }>
                        <Image src={`/icons/${provider.name}.png`} alt={`${provider.name} icon`} width={20} height={20} />
                        {text} con {provider.name}
                    </button>
                )
            })}
        </div>
    )
}

export default ButtonProviders