// pages/_app.js
import { SessionProvider } from "next-auth/react"
import { CartProvider } from '../app/context/CartContext'


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </SessionProvider>
  )
}