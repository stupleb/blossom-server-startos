import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { getAvailableHostnames } from '../utils'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  publicDomain: Value.dynamicSelect(async ({ effects }) => {
    const hosts = await getAvailableHostnames(effects)
    return {
      name: i18n('Public Domain'),
      description: i18n(
        'The hostname that clients will use to reach this Blossom server. Returned in every blob descriptor URL and enforced against the BUD-11 "server" tag in Nostr auth events.',
      ),
      values: hosts.reduce(
        (obj, host) => ({ ...obj, [host]: host }),
        {} as Record<string, string>,
      ),
      default: '',
    }
  }),
})

export const setPrimaryUrl = sdk.Action.withInput(
  'set-primary-url',

  async () => ({
    name: i18n('Set Public Domain'),
    description: i18n(
      'Choose which of this server\'s hostnames is canonical. Blob URLs returned to clients will use this hostname, and Nostr auth events will be validated against it.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    publicDomain:
      (await configYaml.read((c) => c.publicDomain).once()) || undefined,
  }),

  async ({ effects, input }) => {
    await configYaml.merge(effects, { publicDomain: input.publicDomain })
  },
)
