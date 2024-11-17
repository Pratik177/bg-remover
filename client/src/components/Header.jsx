import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20 '>
        {/* left side  */}
        <div >
            <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br className='max-md:hidden'/><span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent '> background </span> from  <br className='max-md:hidden'/> the image for free</h1>
            <p className='my-6 text-[15px] text-gray-500'> Remove the background from the image for free.<br className='max-sm:hidden'/>
            It is very much free without any cost, you can remove background of any image you want. </p>
            <div>
            {/* uploade your image */}
            <input type="file" name= "" id="upload1"  hidden/>
            <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700' htmlFor= "upload1" >
                <img width={20} src={assets.upload_btn_icon} alt="" />
                <p className='text-white text-sm '>Upload your image</p>
            </label>

            </div>
        </div>

        {/* right side */}
        <div>
           <img src={assets.header_img} alt="" className='w-full h-full object-cover'/>

        </div>
      
    </div>
  )
}

export default Header
