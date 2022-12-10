export default class PollsDurableObject {
  private options: OptionsMap | null = null

  constructor(private state: DurableObjectState) {
    this.state.blockConcurrencyWhile(async () => {
      this.options =
        (await this.state.storage.get<OptionsMap>('options')) || new Map()
    })
  }

  async fetch(request: Request) {
    console.log(request.url)
    let url = new URL(request.url)
    switch (url.pathname) {
      case '/':
        return new Response('Hello from a Durable Object!')
      case '/options': {
        if (request.method === 'post') {
          return new Response(null)
        }
        throw new Error('GET not allowed')
      }
      case '/options/:id': {
        if (request.method === 'post') {
          return new Response(null)
        }
        throw new Error('GET not allowed')
      }
      default:
        throw new Error('Not found')
    }
  }
}

type OptionsMap = Map<string, number>
