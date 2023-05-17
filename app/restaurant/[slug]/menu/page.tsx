import { FC } from 'react'
import RestaurantNavbar from '../components/RestaurantNavbar'
import Menu from '../components/Menu'
import { PrismaClient } from '@prisma/client'

interface pageProps {}

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  })
  return restaurant?.items
}

const RestaurantMenu: FC<pageProps> = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const menu = await fetchRestaurantMenu(params.slug)
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      <Menu menu={menu} />
    </div>
  )
}

export default RestaurantMenu
