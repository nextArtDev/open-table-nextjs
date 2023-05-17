import axios from 'axios'
import {useState} from 'react'

interface Props{
    slug:string
    partySize: string
    day: string
    time:string
}
export default function useAvailabilities(){
    const [loading ,setLoading] = useState(false)
    const [error ,setError] = useState(null)
    const [data ,setData] = useState<{time:string; available:boolean}[] | null>(null)

    const fetchAvailabilities = async ({slug ,
    partySize,
    day,
    time } : Props)=>{
        setLoading(true)

        try {
            const response = await axios.get(`http://localhost:3000/api/restaurant/${slug}/availability`,{
                params:{
                    day,
                    time,
                    partySize,
//or it can be:?day=${day}&time=${time}&partySize=${partySize}
                }
            })

            setLoading(false)
            setData(response.data)
        } catch (error:any) {
            setLoading(false)
            setError(error.response.data.errorMessage)
            
        }
    }

    return {data, loading, error, fetchAvailabilities}

}