'use client'
// we type "use client" because next files is server side by default


import { ReactNode } from "react"
import {SessionProvider} from 'next-auth/react'

export default function Provider({children}: {children:ReactNode}){
    return(
        <SessionProvider>{children}</SessionProvider>

    )
}