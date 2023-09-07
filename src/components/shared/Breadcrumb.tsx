import Link from 'next/link'
import { RiArrowRightSLine } from 'react-icons/ri'

interface Props {
    name: string
}

const Breadcrumb = ({ name }: Props) => {
    return (
        <ul className="flex gap-1 items-center text-[12px] leading-[22px] mb-4 uppercase">
            <li className="font-bold text-turquoise"><Link href='/'>Inicio</Link></li>
            <RiArrowRightSLine className="w-4" />
            <li className="font-bold text-turquoise"><Link href='/store'>Tienda</Link></li>
            <RiArrowRightSLine className="w-4" />
            <li><span className="line-clamp-1">{name}</span></li>
        </ul>
    )
}

export default Breadcrumb 