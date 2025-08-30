import logo from '@/assets/logo.jpg';
const Logo = ({size=400}:{size:number}) => {

  return (
    <div className='flex flex-col gap-2 items-center'>
        
        {/* <div className='bg-primary size-10 rounded-sm'/> */}
        <img src={logo} width={size} />
        {/* <p className='text-2xl font-bold'>Blog Flix</p> */}
    </div>
  )
}

export default Logo
