import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const showAdminCredentials = sdk.Action.withoutInput(
  'show-admin-credentials',

  async () => ({
    name: i18n('Show Admin Credentials'),
    description: i18n(
      'Display the current admin dashboard username and password.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const dashboard = await configYaml.read((c) => c.dashboard).once()
    const username = dashboard?.username || 'admin'
    const password = dashboard?.password || ''

    return {
      version: '1',
      title: i18n('Admin Dashboard Credentials'),
      message: password
        ? i18n(
            'Use these credentials to sign in to the admin dashboard at /admin.',
          )
        : i18n(
            'No admin password has been set. Run "Set Admin Password" to generate one.',
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
            value: password || '(unset)',
            masked: !!password,
            copyable: !!password,
            qr: false,
          },
        ],
      },
    }
  },
)
