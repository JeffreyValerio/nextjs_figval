interface Props {
    children: React.ReactNode,
    className?: string,
}
const ContentLayout = ({ children, className }: Props) => {
    return (
        <div className={`${className || ''} max-w-7xl mx-auto py-2 md:py-4`}>
            {children}
        </div>
    )
}

export default ContentLayout 