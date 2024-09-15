declare class AudioWorkletProcessor {
  readonly port: MessagePort
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>
  ): boolean
}

type AudioParamDescriptor = {
  name: string
  automationRate: AutomationRate
  minValue: number
  maxValue: number
  defaultValue: number
}

declare function registerProcessor(
  name: string,
  processorCtor: Constructor<AudioWorkletProcessor>
): void
