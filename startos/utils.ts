import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 3000

export const PRIMARY_INTERFACE_ID = 'primary'

export async function getAvailableHostnames(
  effects: T.Effects,
): Promise<string[]> {
  const urls = await sdk.serviceInterface
    .getOwn(
      effects,
      PRIMARY_INTERFACE_ID,
      (i) => i?.addressInfo?.nonLocal.format() || [],
    )
    .const()

  return urls.map(stripScheme).filter((h) => h.length > 0)
}

function stripScheme(url: string): string {
  try {
    return new URL(url).host
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  }
}
