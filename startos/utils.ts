import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 3000

export const PRIMARY_INTERFACE_ID = 'primary'

export async function getAvailableHostnames(
  effects: T.Effects,
): Promise<string[]> {
  const urls = await sdk.host
    .getOwn(effects, 'ui-multi', (host) => {
      const primary = Object.values(host?.bindings ?? {})
        .flatMap((b) => Object.values(b.interfaces))
        .find((i) => i.id === PRIMARY_INTERFACE_ID)
      return primary?.addressInfo.nonLocal.format() ?? []
    })
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
