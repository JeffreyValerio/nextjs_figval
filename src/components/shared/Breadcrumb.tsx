import Link from 'next/link'
import { RiArrowRightSLine } from 'react-icons/ri'

interface Props {
    name: string
}

const Breadcrumb = ({ name }: Props) => {
    return (
        <ul className="flex gap-1 items-center text-[12px] leading-[22px] mb-4 uppercase">
            <li className="font-bold"><Link href='/'>Inicio</Link></li>
            <li><RiArrowRightSLine className="w-4" /></li>
            <li className="font-bold"><Link href='/store'>Tienda</Link></li>
            <li><RiArrowRightSLine className="w-4" /></li>
            <li><span className="line-clamp-1">{name}</span></li>
        </ul>
    )
}

export default Breadcrumb 