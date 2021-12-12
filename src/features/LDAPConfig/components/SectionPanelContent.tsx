/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React, { Fragment } from 'react'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react'

const getUserProfile = (userProfiles, userId) => userProfiles.find(userProfile => userProfile.id === userId)

const getColumnName = sectionTitle => {
  switch (sectionTitle) {
    case 'mappings':
      return ['Location', 'Profile']
    case 'profile':
      return ['Detail', '']
    default:
      return ['LDAP Attribute', 'LDAP value']
  }
}

const SectionPanelTable = ({ columns, children }) => {
  return (
    <Table>
      <Thead>
        <Tr
          css={{
            background: '#BBBBBB',
          }}
        >
          {columns.map(column => {
            return <Th key={column} color="white">{column}</Th>
          })}
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  )
}

const ProfileValuesContent = ({ attributeName, values, userProfiles }) => {
  const profileValue = getUserProfile(userProfiles, values)

  switch (attributeName) {
    case 'processing':
      const processing = Object.keys(values).map(processingValue => {
        return {
          values: values[processingValue],
          processingName: processingValue,
        }
      })

      return (
        <div>
          {processing.map(processingData => {
            return (
              <div key={processingData.processingName}>
                {processingData.processingName} {`[${processingData.values.join(', ')}]`}
              </div>
            )
          })}
        </div>
      )

    case 'policies':
      return <Fragment>{`[${values.join(', ')}]`}</Fragment>

    case 'profileId':
      return <Fragment>Profile{profileValue.id}</Fragment>

    case 'allowed':
      return <Fragment>{values ? 'True' : 'False'}</Fragment>

    case 'evaluations':
      return (
        <SectionPanelTable columns={['Profile', 'Result']}>
          {values.map(evaluation => {
            const userId = evaluation.path.split('/')[2]

            return (
              <Tr key={evaluation.id}
                css={{
                  color: evaluation.allowed ? '#51B260' : '',
                  marginTop: '100px !important'
                }}
                background={evaluation.allowed ? '#DFF0D8' : ''}
                border={evaluation.allowed ? '1px solid #51B260' : ''}
              >
                <Td>{getUserProfile(userProfiles, +userId)?.name}</Td>
                <Td
                >{evaluation.allowed ? <strong>Allowed</strong> : evaluation.evaluations[0].result?.error?.msg}</Td>
              </Tr>
            )
          })}
        </SectionPanelTable>
      )

    default:
      return null
  }
}


const SectionPanelContent = ({ section, sectionData, isSuccess, userProfiles }) => {
  const attributesName = Array.isArray(sectionData.data) ? Object.keys(sectionData.data[1]) : []
  const ldapConfigData = attributesName.map(attributeName => {
    return {
      attributeName,
      values: sectionData.data[1][attributeName],
    }
  })

  switch (section) {
    case 'settings':
      return (
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {!isSuccess && <div>{sectionData.msg?.error?.msg}</div>}
          <SectionPanelTable columns={getColumnName(section)}>
            {ldapConfigData.map(ldapConfig => {
              return (
                <Tr key={ldapConfig.attributeName}>
                  <Td>{ldapConfig.attributeName}</Td>
                  <Td>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {ldapConfig.values.map(ldapConfigValue => {
                        return <div key={ldapConfigValue}>{ldapConfigValue}</div>
                      })}
                    </div>
                  </Td>
                </Tr>
              )
            })}
          </SectionPanelTable>
        </Box>
      )

    case 'mappings':
      const userProfile = sectionData.data.profile

      return (
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SectionPanelTable columns={getColumnName(section)}>
            <Tr>
              <Td>{sectionData.data.location ?? 'undefined'}</Td>
              <Td>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  {`id=${userProfile.id}, name=${userProfile.name}`}
                </div>
              </Td>
            </Tr>
          </SectionPanelTable>
        </Box>
      )

    case 'user':
    case 'details':
    case 'assertions':
      const ldapConfigTableRowData = Array.isArray(sectionData.data)
        ? ldapConfigData
        : Object.keys(sectionData.data).map(attributeName => {
            return {
              attributeName,
              values: sectionData.data[attributeName],
            }
          })

      return (
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SectionPanelTable columns={getColumnName(section)}>
            {ldapConfigTableRowData.map(ldapConfig => {
              return (
                <Tr key={ldapConfig.attributeName}>
                  <Td>{ldapConfig.attributeName}</Td>
                  <Td>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {ldapConfig.values.map(ldapConfigValue => {
                        return <div key={ldapConfigValue}>{ldapConfigValue}</div>
                      })}
                    </div>
                  </Td>
                </Tr>
              )
            })}
          </SectionPanelTable>
        </Box>
      )

    case 'profile':
      const attributesName = ['processing', 'policies', 'profileId', 'allowed', 'evaluations']

      const profileData = Object.keys(sectionData.data)
        .filter(attributeName => attributesName.includes(attributeName))
        .map(attributeName => {
          return {
            attributeName,
            values: sectionData.data[attributeName],
          }
        })

      return (
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SectionPanelTable columns={getColumnName(section)}>
            {profileData.map(({ attributeName, values }) => {
              console.log(attributeName)
              return (
                <Tr key={attributeName}>
                  <Td>{attributeName}</Td>
                  <Td>
                    <div
                      css={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <ProfileValuesContent attributeName={attributeName} values={values} userProfiles={userProfiles} />
                    </div>
                  </Td>
                </Tr>
              )
            })}
          </SectionPanelTable>
        </Box>
      )

    default:
      return <div>{section} panel</div>
  }
}

export {
  SectionPanelContent,
  SectionPanelTable,
  ProfileValuesContent,
}
