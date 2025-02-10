import type { Schema } from './store'

export default {
  '/crop': { type: 'xy', default: [0, 0], bounds: [400, 400] }
} satisfies Schema
