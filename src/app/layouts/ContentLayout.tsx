interface Props {
    children: React.ReactNode,
    className?: string,
}
const ContentLayout = ({ children, className }: Props) => {
    return (
        <div className={`${className || ''} max-w-7xl mx-auto py-4 px-2 md:px-0`}>
            {children}
        </div>
    )
}

export default ContentLayout 