import { Form } from '@remix-run/react'

export default function Index() {
  return (
    <main>
      <Form action='/create-room' method='post'>
        <button type='submit'>Create Poll</button>
      </Form>
    </main>
  )
}
