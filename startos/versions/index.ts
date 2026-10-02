import { VersionGraph } from '@start9labs/start-sdk'
import { current } from './current'
import { v_6_4_0_0 } from './v6.4.0_0'

export const versionGraph = VersionGraph.of({
  current,
  other: [v_6_4_0_0],
})
