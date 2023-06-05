import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '../../../../lib/prismadb'
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import { NextAuthOptions } from "next-auth";
import bcrypt from 'bcrypt'

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
            async authorize(credentials ) : Promise<any> {

                //check if if credentials is entered 

                if(!credentials?.email || ! credentials?.password){
                    throw new Error('Please enter an email address and a password')
                } 

                //check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                //check if user was found and has a password

                if(!user || !user?.hashedPassword) {
                    throw new Error('User not found')
                }
                //check if password matches
                const pass = bcrypt.compare(user.hashedPassword, credentials.password)
                if(!pass){
                    throw new Error('Incorrect password')
                }

                return user;

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