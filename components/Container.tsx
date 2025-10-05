import { ReactNode } from 'react'

export default function Container({children, className=''}:{children:ReactNode, className?:string}){
  return <div className={`container max-w-6xl ${className}`}>{children}</div>
}
