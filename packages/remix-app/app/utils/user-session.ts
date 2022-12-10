import { createCookieSessionStorage } from '@remix-run/cloudflare'

let { commitSession, destroySession, getSession } = createCookieSessionStorage({
  cookie: {
    name: '__user',
    sameSite: 'lax',
    path: '/',
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24 * 7,
    secrets: ['secret'],
  },
})

export async function getUserSession(cookie?: string | null) {
  const session = await getSession(cookie)

  function get(key: string) {
    return session.get(key)
  }

  function set(key: string, value: string) {
    session.set(key, value)
  }

  function getId() {
    let id = get('id')

    if (!id) {
      id = crypto.randomUUID()
    }

    return id
  }

  const id = getId()

  return {
    id,
    commit: async () =>
      await commitSession(session, { maxAge: 60 * 60 * 24 * 7 }),
    get,
    init: () => {
      if (!get('id')) {
        set('id', id)
      }
    },
    set,
    destroy: async () => await destroySession(session),
  }
}
