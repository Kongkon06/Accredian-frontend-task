import Work from '@/assets/Group 22094.svg'
import { Button } from './ui/button'
export function SVG(){
    return <div className="max-h-6xl py-8 bg-[#EEF5FF]">
        <h1 className="text-xl flex justify-center items-center mb-8">How Do I <span className="ml-1 text-xl text-blue-600">Refer</span></h1>
        <div className=" mb-8 ">
        <img src={Work} className='mx-auto max-h-md object-fit' alt="Group Icon" />
        </div>
        <div className='flex justify-center mb-8'>
        <Button className='bg-blue-600 font-light text-xl'>
            Refer Now
        </Button>
        </div>
    </div>
}