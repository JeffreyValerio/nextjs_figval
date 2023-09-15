import delve from 'dlv';
import ReactMarkdown from 'react-markdown';
import { strapiFetch } from '@/libs'
import { Title } from '@/components';

const AboutUsPage = async () => {
  const [resAboutPage] = await Promise.all([
    strapiFetch('/about-us', 'no-cache')
  ])
  const [aboutPage] = await Promise.all([resAboutPage])

  const { title, content, updatedAt } = delve(aboutPage, 'data.attributes')
  const date = new Date(updatedAt).toLocaleDateString()

  if (!aboutPage) { return <></> }

  return (
    <div className="flex flex-col items-center mt-8">

      <Title className="content-center mb-[5px]">{title}</Title>
      <span className="text-[12px]">Última actualización {date}</span>

      <div className={`markdown text-md my-5 mx-3 sm:mx-0`}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

    </div>
  )
}

export default AboutUsPage