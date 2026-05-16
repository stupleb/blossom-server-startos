import { utils } from '@start9labs/start-sdk'
import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const setAdminPassword = sdk.Action.withoutInput(
  'set-admin-password',

  async () => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Generate a new random password for the admin dashboard. Replaces any existing password.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const password = utils.getDefaultString({
      charset: 'a-z,A-Z,0-9',
      len: 32,
    })
    const username =
      (await configYaml.read((c) => c.dashboard.username).once()) || 'admin'

    await configYaml.merge(effects, { dashboard: { password } })

    return {
      version: '1',
      title: i18n('Admin Dashboard Credentials'),
      message: i18n(
        'Use these credentials to sign in to the admin dashboard at /admin.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: username,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: password,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
