import type {
  DataFunctionArgs,
  LinksFunction,
  MetaFunction,
} from '@remix-run/cloudflare'
import { json } from '@remix-run/cloudflare'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import styles from '~/styles/app.css'
import { getUserSession } from '~/utils/user-session'

export let meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
  'color-scheme': 'dark light',
})

export let links: LinksFunction = () => [{ rel: 'stylesheet', href: styles }]

export let loader = async ({ request }: DataFunctionArgs) => {
  const cookie = request.headers.get('Cookie')
  const userSession = await getUserSession(cookie)

  userSession.init()

  return json(null, { headers: { 'Set-Cookie': await userSession.commit() } })
}

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
