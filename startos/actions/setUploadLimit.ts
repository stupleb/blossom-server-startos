import { configYaml } from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const BYTES_PER_MB = 1024 * 1024

const inputSpec = InputSpec.of({
  maxSizeMb: Value.number({
    name: i18n('Max Upload Size (MB)'),
    description: i18n(
      'Maximum blob size accepted by the upload endpoint. Enforced from the Content-Length header before any body bytes are read.',
    ),
    required: true,
    default: 2048,
    min: 1,
    max: 102400,
    step: 1,
    integer: true,
    units: 'MB',
  }),
})

export const setUploadLimit = sdk.Action.withInput(
  'set-upload-limit',

  async () => ({
    name: i18n('Set Max Upload Size'),
    description: i18n(
      'Change the maximum blob size accepted by the upload and mirror endpoints.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const bytes =
      (await configYaml.read((c) => c.upload.maxSize).once()) ??
      2 * 1024 * BYTES_PER_MB
    return { maxSizeMb: Math.round(bytes / BYTES_PER_MB) }
  },

  async ({ effects, input }) => {
    await configYaml.merge(effects, {
      upload: { maxSize: input.maxSizeMb * BYTES_PER_MB },
    })
  },
)
