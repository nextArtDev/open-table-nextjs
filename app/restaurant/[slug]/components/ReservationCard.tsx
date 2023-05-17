'use client'
import { partySize as partySizes, times } from '@/data'
import useAvailabilities from '@/hooks/useAvailabilities'
import { convertToDisplayTime } from '@/utils/convertToDisplayTime'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import { FC, useState } from 'react'
import DatePicker from 'react-datepicker'

interface ReservationCardProps {
  openTime: string
  closeTime: string
  slug: string
}

const ReservationCard: FC<ReservationCardProps> = ({
  openTime,
  closeTime,
  slug,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())

  const { data, loading, error, fetchAvailabilities } = useAvailabilities()

  const [time, setTime] = useState(openTime)
  const [partySize, setPartySize] = useState('2')
  const [day, setDay] = useState(new Date().toISOString().split('T')[0])

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDay(date.toISOString().split('T')[0])
      return setSelectedDate(date)
    }
    return setSelectedDate(null)
  }

  const handleClick = () => {
    fetchAvailabilities({ slug, day, time, partySize })
  }

  //Example openTime: 14:30:00.000Z 2:30
  //closeTime: 21:30:00.000Z 21:30
  const filterTimeByRestaurantOpenWindw = () => {
    const timesWhithinWindow: typeof times = []

    let isWithinWindow = false

    times.forEach((time) => {
      //if we reach to openTime
      if (time.time === openTime) {
        isWithinWindow = true
      }
      //start pushing the time
      if (isWithinWindow) {
        timesWhithinWindow.push(time)
      }
      //if we reach the closeTime, stop it
      if (time.time === closeTime) {
        isWithinWindow = false
      }
    })
    return timesWhithinWindow
  }

  return (
    <div className="fixed top-[30%] w-[25%] bg-white rounded p-3 shadow">
      <div className="text-center border-b pb-2 font-bold">
        <h4 className="mr-7 text-lg">Make a Reservation </h4>
      </div>
      <div className="my-3 flex flex-col">
        <label htmlFor="">Party size</label>
        <select
          name=""
          value={partySize}
          onChange={(e) => setPartySize(e.target.value)}
          className="py-3 border-b font-light"
          id=""
        >
          {partySizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col w-[48%] text-sm">
          <label htmlFor="">Date</label>
          <DatePicker
            selected={selectedDate}
            dateFormat="MMMM d"
            onChange={handleChangeDate}
            className="py-3 border-b font-light w-28"
            wrapperClassName="w-[48%]"
          />
        </div>
        <div className="flex flex-col w-[45%] text-sm ">
          <label htmlFor="">Time</label>
          <select
            name=""
            id=""
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="py-3 border-b font-light"
          >
            {filterTimeByRestaurantOpenWindw().map((time) => (
              <option value={time.time} key={time.time}>
                {' '}
                {time.displayTime}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5">
        <button
          onClick={handleClick}
          disabled={loading}
          className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
        >
          {loading ? <CircularProgress color="inherit" /> : 'Find a time'}
        </button>
      </div>
      {data && data.length ? (
        <div className="mt-4">
          <p className="text-reg">Select a Time</p>
          <div className="flex flex-wrap mt-2">
            {data.map((time) => {
              return time.available ? (
                <Link
                  href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                  className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                >
                  <p className="text-sm font-bold">
                    {convertToDisplayTime(time.time)}
                  </p>
                </Link>
              ) : (
                <p className="bg-gray-500 p-2 w-24 mb-3 rounded mr-3" />
              )
            })}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ReservationCard
