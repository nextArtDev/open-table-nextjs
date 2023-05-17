import { FC } from 'react'

interface loadingProps {}

const loading: FC<loadingProps> = ({}) => {
  return (
    <main>
      <div className="h-96 overflow-hidden animate-pulse bg-slate-200">
        <div className={`bg-center h-full`}></div>
      </div>
      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-9 ">
        <div className="bg-white w-[70%] rounded p-3 shadow ">
          <nav className="flex text-reg border-b pb-2 ">
            <h4 className="mr-7">Overview</h4>
            <p className="mr-7">Menu</p>
            <h4 className="mr-7">Review</h4>
          </nav>
          {/* Title */}
          <div className="mt-4 border-b pb-6 animate-pulse bg-slate-200 w-[400px] h-16 rounded "></div>
          {/* Title */}

          {/** Rating */}
          <div className="flex items-end animate-pulse ">
            <div className="rating mt-2 flex items-center ">
              <p className="text-reg ml-3 "></p>
            </div>
            <div>
              <p className="text-reg ml-1 ml-4 "></p>
            </div>
          </div>
          {/** Rating */}
        </div>
      </div>
    </main>
  )
}

export default loading
