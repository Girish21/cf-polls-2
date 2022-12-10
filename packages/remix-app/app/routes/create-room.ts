import type { DataFunctionArgs } from '@remix-run/cloudflare'
import { redirect } from '@remix-run/cloudflare'

export let action = async ({ context }: DataFunctionArgs) => {
  let pollId = context.env.POLLSDO.newUniqueId()

  return redirect(`/poll/${pollId}/create`)
}
