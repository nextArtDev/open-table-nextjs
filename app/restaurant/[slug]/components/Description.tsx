import { FC } from 'react'

interface DescriptionProps {
  description: string
}

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{description}</p>
    </div>
  )
}

export default Description
