import Image from 'next/image'
import FormRegister from './form-register'

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#e0eafc] to-[#cfdef3] p-6 md:p-10 overflow-hidden">
      <h1 className="">Sign Up</h1>
      <div className="w-full max-w-5xl grid grid-cols-[1fr_2fr] p-10  gap-10 rounded-2xl bg-white">
        <div className="relative ">
          <Image src={'/assets/images/login-bg.jpg'} fill className=" object-cover" alt="register-img" />
        </div>
        <div className="flex-1 p-5">
          <FormRegister />
        </div>
      </div>
    </div>
  )
}
