/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { jsx, css } from '@emotion/react'
import { LDAPConfig } from '@/features/LDAPConfig'
import mockPayload from '../../__mocks__/payload.json'

import type { NextPage } from '@/types/next'

const LDAPConfigPage: NextPage = () => {
  return (
    <>
       <LDAPConfig payload={mockPayload} />
    </>
  )
}

export default LDAPConfigPage