import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/user'
import { connectDB } from '@/utils/database'


export const OPTIONS={ 
   providers:[
   GoogleProvider({
      clientId:process.env.GOOGLE_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SECRET
  
   }),
   GitHubProvider({
      clientId:process.env.GITHUB_ID,
      clientSecret:process.env.GITHUB_CLIENT_SECRET
  
   }),
   CredentialsProvider({
      name: "Credentials",
      credentials: {
       
          email: {
              label: "email:",
              type: "text",
              placeholder: "your-Email"
          },
          password: {
              label: "Password:",
              type: "password",
              placeholder: "your-password"
          }
      },
      async authorize(credentials) {
        try {
          const foundUser=await User.findOne({email:credentials.email}).lean().exec()
          if (foundUser) {
              console.log('user exist')
              delete foundUser.password;
              return foundUser
          }
          }
          catch(error){console.log(error)}
         return null
      }
   }),





],
   callbacks:{
     async session({session}){
      await  connectDB()
        const sessionUser=await User.findOne({email:session.user.email})
        if(!sessionUser){
         await User.create({
            username:session.user.name,
            email:session.user.email})
        }
        session.user.id=sessionUser._id.toString()
        session.user.name=sessionUser.username
        session.user.role=sessionUser.role
        return session
  
   },  
  
  }
  
  
  }

const handler=NextAuth(OPTIONS)
  

export {handler as GET,handler as POST}