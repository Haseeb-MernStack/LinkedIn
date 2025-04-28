import { InfoIcon } from 'lucide-react';
import React from 'react';

// interface nav items

interface NAVITEMS{
  heading: string,
  subHeading: string, 
}

// Nav items array.
const newsItems:NAVITEMS[]=[
  {
    heading:"First news of the day.",
    subHeading:"1h ago - 345 readers"
  },
  {
    heading:"second news of the day.",
    subHeading:"2h ago - 345 readers"
  },
  {
    heading:"third news of the day.",
    subHeading:"3h ago - 345 readers"
  },
  {
    heading:"fourth news of the day.",
    subHeading:"4h ago - 345 readers"
  },
]

const News = () => {
  return (
    <div className='hidden md:block w-[25%] bg-white h-fit rounded-lg border border-gray-300'>
      <div className='flex items-center justify-between p-3'>
        <h1 className='font-medium'>LinkedIn News</h1>
        <InfoIcon size={18}/>
      </div>
      <div>
        {
          newsItems.map((item,index)=>{
            return(
              <div key={index} className='px-3 py-2 hover:bg-gray-200 hover:cursor-pointer'>
                <h1 className='text-sm font-medium'>{item.heading}</h1>
                <p className='text-xs text-gray-600'>{item.subHeading}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default News
