import { FC } from 'react'
import {  Review} from '@prisma/client'
interface calculateReviewRatingAverageProps {
  reviews: Review[]
}

const calculateReviewRatingAverage: FC<calculateReviewRatingAverageProps> = ({reviews}) => {
   if(!reviews?.length) return 0;

   return (
    reviews.reduce((sum, review)=>{
        return sum + review.rating;
    },0 )/reviews.length
   )
}

export default calculateReviewRatingAverage