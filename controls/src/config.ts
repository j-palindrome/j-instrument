import { createSchema } from './store'

export default createSchema({
  '/crop': { type: 'xy', default: [0, 0], bounds: [400, 400] }
})
