interface Window {
  max?: {
    outlet: (...args: any[]) => void
    bindInlet: (name: string, ...args: any[]) => void
  }
}
