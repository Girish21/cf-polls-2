import { Form } from '@remix-run/react'

export default function CreatePoll() {
  return (
    <main>
      <Form method='post'>
        <div>
          <label htmlFor='question'>Poll Question</label>
          <textarea id='question' name='question' />
        </div>
      </Form>
    </main>
  )
}
