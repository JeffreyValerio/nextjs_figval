import Link from 'next/link'
import ContentLayout from './layouts/ContentLayout'

const NotFound = async () => {
    return (
        <ContentLayout>
            Back to <Link href="/">Home</Link>
        </ContentLayout>
    )
}

export default NotFound