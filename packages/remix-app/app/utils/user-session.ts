import { createCookieSessionStorage } from '@remix-run/cloudflare'

export async function getUserSession(env: Env, cookie?: string | null) {
  let { commitSession, destroySession, getSession } =
    createCookieSessionStorage({
      cookie: {
        name: '__user',
        sameSite: 'lax',
        path: '/',
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        secrets: [env.SESSION_SECRET],
      },
    })

  let session = await getSession(cookie)

  function get(key: string) {
    return session.get(key)
  }

  function set(key: string, value: string) {
    session.set(key, value)
  }

  async function commit() {
    return await commitSession(session, { maxAge: 60 * 60 * 24 * 7 })
  }

  async function destroy() {
    return await destroySession(session)
  }

  function getId() {
    let id = get('id')

    if (!id) {
      id = crypto.randomUUID()
    }

    return id
  }
  const id = getId()

  function init() {
    if (!get('id')) {
      set('id', id)
    }
  }

  return {
    id,
    commit,
    get,
    init,
    set,
    destroy,
  }
}
