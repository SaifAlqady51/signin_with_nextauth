import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../../lib/prismadb'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from "next-auth";


type User = {
    id:number,
    name:string,
    email:string
}


export const authOptions : NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET, 
    adapter: PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:'credentials',
            credentials : {
                email : {label:'Email',type: 'text',placeholder:'joe@example.com'},
                password : {label:'Password',type: 'password',placeholder:'password'},
                username : {label:'Username',type: 'text',placeholder:'joe'}
            },
            async authorize(credentials) {
                const user = {id:1,name:"saif",email:"saif@example.com"}
                return user  as any;
            } 
        }) 

    ],
    session:{
        strategy:"jwt"
    },
    debug: process.env.NODE_ENV == 'development'
}


const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}