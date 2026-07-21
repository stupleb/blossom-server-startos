import { T } from '@start9labs/start-sdk'
import { sdk } from './sdk'

export const uiPort = 3000

export const PRIMARY_INTERFACE_ID = 'primary'

export async function getAvailableHostnames(
  effects: T.Effects,
): Promise<string[]> {
  // 2.0: interfaces are reached through their host. Walk the 'ui-multi' host
  // (the MultiHost id from interfaces.ts) to the primary interface; its
  // addressInfo comes back pre-filled with the filter/format helpers.
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
