import { PresetSocket } from '@libs/oscPresets/modules/store'

export const getChannel = (ctx: AudioContext, socket: PresetSocket) => {
  switch (ctx.destination.maxChannelCount) {
    case 32:
      // MOTU
      socket.emit('osc', 'max', '/channels/device', 'BlackHole Ultralite')
      socket.emit('osc', 'max', '/channels/input', 1, 2)
      socket.emit('osc', 'max', '/channels/output', 17, 18)
      socket.emit('osc', 'max', '/channels/loopback', 15, 16)
      // // the recording loopback from Max to TD
      socket.emit('osc', 'td', '/channels/loopback', 32, 33)
      return 18
    case 18:
      // MacBook
      socket.emit('osc', 'max', '/channels/device', 'Mac & BlackHole')
      socket.emit('osc', 'max', '/channels/input', 2, 3)
      socket.emit('osc', 'max', '/channels/output', 1, 2)
      // the recording loopback from Max to TD
      socket.emit('osc', 'max', '/channels/loopback', 17, 18)
      socket.emit('osc', 'td', '/channels/loopback', 15, 16)
      return 2
    default:
      throw new Error('must use BlackHole with MOTU or with Mac Audio')
  }
}
