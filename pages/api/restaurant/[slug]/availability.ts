import { times } from '@/data'
import { findAvailableTables } from '@/services/restaurant/findAvailableTables'
import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { slug, day, time, partySize } = req.query as {
      slug: string
      day: string
      time: string
      partySize: string
    }

    if (!day || !time || !partySize) {
      return res.status(400).json({
        errorMessage: 'inValid data',
      })
    }

    const restaurant = await prisma.restaurant.findUnique({
      where: {
        slug,
      },
      select: {
        tables: true,
        open_time: true,
        close_time: true,
      },
    })
    if (!restaurant) {
      return res.status(400).json({
        errorMessage: 'Invalid data',
      })
    }
    const searchTimesWithTables = await findAvailableTables({
      time,
      day,
      res,
      restaurant,
    })

    if (!searchTimesWithTables) {
      return res.status(400).json({
        errorMessage: 'inValid data',
      })
    }

    const availabilities = searchTimesWithTables
      .map((t) => {
        const sumSeats = t.tables.reduce((sum, table) => {
          return sum + table.seats
        }, 0)

        return {
          time: t.time,
          available: sumSeats >= parseInt(partySize),
        }
      })
      .filter((availablity) => {
        const timeIsAfterOpeningHour =
          new Date(`${day}T${availablity.time}`) >=
          new Date(`${day}T${restaurant.open_time}`)
        const timeIsBeforeClosingHour =
          new Date(`${day}T${availablity.time}`) <=
          new Date(`${day}T${restaurant.close_time}`)

        return timeIsAfterOpeningHour && timeIsBeforeClosingHour
      })

    return res.json(availabilities)
  }
}

// http://localhost:3000/api/restaurant/est-restaurant-niagara/availability?day=2023-01-01&time=17:00:00.000Z&partySize=4
