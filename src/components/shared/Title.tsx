interface Props {
    children: React.ReactNode,
    className?: string
}

const Title = ({ className, children }: Props) => {
    return (
        <>
            <h1
                className={`${className || ''} text-center w-[400px] text-[20px] md:text-[25px] font-serif font-bold uppercase leading-6 text-black mb-[30px]`}>
                <span className="relative block pb-[10px] before:content-[''] before:w-1/4 before:h-[0px] before:border-2 before:border-[#64B8C8] before:absolute before:bottom-0">
                    {children}
                </span>
            </h1>
        </>
    )
}

export default Title