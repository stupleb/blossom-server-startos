import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const inputSpec = InputSpec.of({
  title: Value.text({
    name: i18n('Title'),
    description: i18n(
      "The name shown at the top of the landing page and in the browser's tab.",
    ),
    required: true,
    default: 'Blossom Server',
    maxLength: 100,
  }),
  showStats: Value.toggle({
    name: i18n('Show Server Stats'),
    description: i18n(
      'Show how many files the server holds, the storage they use, and the uploads in the last 24 hours.',
    ),
    default: true,
  }),
})

export const setLandingPage = sdk.Action.withInput(
  'set-landing-page',

  async () => ({
    name: i18n('Customize Landing Page'),
    description: i18n(
      "Set the title of the page visitors see at this server's address, and whether it shows the server's stats.",
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) =>
    (await configYaml
      .read(({ landing: { title, showStats } }) => ({ title, showStats }))
      .once()) ?? undefined,

  async ({ effects, input }) => {
    await configYaml.merge(effects, { landing: input })
  },
)
