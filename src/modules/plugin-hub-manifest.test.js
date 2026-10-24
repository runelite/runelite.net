import { TextDecoder } from 'util'
import { fetchExternalPlugins } from './plugin-hub'

global.TextDecoder = TextDecoder
const mockRequest = jest.fn()
jest.mock('../api', () => () => (...args) => mockRequest(...args))
jest.mock('./bootstrap', () => ({ getLatestRelease: () => 'test' }))

it('matches plugin availability by internal name and preserves display entries', async () => {
  const display = ['available', 'unavailable', 'also-available'].map(
    internalName => ({
      internalName,
      description: 'A plugin'
    })
  )
  const bytes = Buffer.concat([
    Buffer.alloc(4),
    Buffer.from(
      JSON.stringify({
        display,
        jars: [
          { internalName: 'also-available' },
          { internalName: 'available' }
        ]
      })
    )
  ])
  mockRequest.mockResolvedValue(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
  )
  const dispatch = jest.fn()

  const plugins = await fetchExternalPlugins().payload(dispatch, () => ({}))

  expect(
    plugins.map(({ internalName, working }) => ({ internalName, working }))
  ).toEqual([
    { internalName: 'available', working: true },
    { internalName: 'unavailable', working: false },
    { internalName: 'also-available', working: true }
  ])
  expect(dispatch.mock.calls[0][0].payload).toEqual(plugins)
})
