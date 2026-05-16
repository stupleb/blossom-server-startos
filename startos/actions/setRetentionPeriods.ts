import {
  configYaml,
  RULE_CATEGORIES,
  RuleCategory,
} from '../fileModels/config.yml'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

const DURATION_PATTERN = {
  regex: '^\\d+\\s+(second|minute|hour|day|week|month|year)s?$',
  description: i18n(
    'Format: "<number> <unit>" where unit is seconds, minutes, hours, days, weeks, months, or years. Examples: "1 week", "30 days", "1 month".',
  ),
}

const inputSpec = InputSpec.of({
  images: Value.text({
    name: i18n('Images'),
    description: i18n(
      'How long to keep image blobs (image/*) after their last access.',
    ),
    required: true,
    default: '1 month',
    masked: false,
    placeholder: '1 month',
    patterns: [DURATION_PATTERN],
  }),
  videos: Value.text({
    name: i18n('Videos'),
    description: i18n(
      'How long to keep video blobs (video/*) after their last access.',
    ),
    required: true,
    default: '1 week',
    masked: false,
    placeholder: '1 week',
    patterns: [DURATION_PATTERN],
  }),
  audio: Value.text({
    name: i18n('Audio'),
    description: i18n(
      'How long to keep audio blobs (audio/*) after their last access.',
    ),
    required: true,
    default: '1 week',
    masked: false,
    placeholder: '1 week',
    patterns: [DURATION_PATTERN],
  }),
  other: Value.text({
    name: i18n('Other'),
    description: i18n(
      'How long to keep blobs of any other MIME type after their last access. Acts as the catch-all.',
    ),
    required: true,
    default: '1 week',
    masked: false,
    placeholder: '1 week',
    patterns: [DURATION_PATTERN],
  }),
})

const FIELD_FOR_CATEGORY: Record<
  RuleCategory,
  'images' | 'videos' | 'audio' | 'other'
> = {
  'image/*': 'images',
  'video/*': 'videos',
  'audio/*': 'audio',
  '*': 'other',
}

export const setRetentionPeriods = sdk.Action.withInput(
  'set-retention-periods',

  async () => ({
    name: i18n('Set Retention Periods'),
    description: i18n(
      'Choose how long each kind of blob is kept after its last access. Blobs whose MIME type matches no category use the "Other" period.',
    ),
    warning: i18n(
      'This action rewrites your retention rules to exactly four categories (Images, Videos, Audio, Other). Any custom rules edited directly in config.yml will be replaced.',
    ),
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => {
    const rules = (await configYaml.read((c) => c.storage.rules).once()) ?? []
    const find = (cat: RuleCategory) =>
      rules.find((r) => r.type === cat)?.expiration
    return {
      images: find('image/*') ?? '1 month',
      videos: find('video/*') ?? '1 week',
      audio: find('audio/*') ?? '1 week',
      other: find('*') ?? '1 week',
    }
  },

  async ({ effects, input }) => {
    const existing =
      (await configYaml.read((c) => c.storage.rules).once()) ?? []
    const pubkeysFor = (cat: RuleCategory) =>
      existing.find((r) => r.type === cat)?.pubkeys

    const newRules = RULE_CATEGORIES.map((cat) => {
      const expiration = input[FIELD_FOR_CATEGORY[cat]]
      const pubkeys = pubkeysFor(cat)
      return {
        type: cat,
        expiration,
        ...(pubkeys && pubkeys.length ? { pubkeys } : {}),
      }
    })

    await configYaml.merge(effects, { storage: { rules: newRules } })
  },
)
