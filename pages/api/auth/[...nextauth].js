import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signinGoogle } from '@/services/auth/signinGoogle';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {
    sessionToken: {
      name: `session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/auth/user/GoogleLogin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.accessToken) {
       console.log(user)
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("accessToken",token)
      if (token?.accessToken) {
        // اضافه کردن accessToken از توکن JWT به session
        session.accessToken = token.accessToken;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        const response = await signinGoogle({
          email: user.email,
          name: user.name,
          image: user.image,
          googleId:user.id
        });

        if (response.success) {
          // ذخیره کردن accessToken در user
          user.accessToken = response.accessToken;
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error('خطا در ورود با گوگل:', error);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // ریدایرکت به آدرس baseUrl پس از ورود
      return `${baseUrl}`;
    },
  },
});
