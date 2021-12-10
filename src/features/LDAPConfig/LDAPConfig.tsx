/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React, { Fragment } from 'react'
import { useQuery } from 'react-query'
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tag,
  Heading,
  CloseButton,
  Spinner,
} from '@chakra-ui/react'
import { ldapconfigApi } from '../../api/ldapConfig/ldapConfig.api'
import { SectionPanelContent } from './components/SectionPanelContent'

export const getSectionTitle = (sectionTitle, payload) => {
  return payload.steps[sectionTitle].desc
}

export const LDAPConfig = ({ payload }) => {
  const { data: userProfiles = [], isLoading } = useQuery('profiles', async () => ldapconfigApi.getProfiles())

  const sections = payload.order

  if (isLoading) {
    return (
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: 'calc(100vh - 200px)',
        }}
      >
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      </div>
    )
  }

  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 'calc(100vh - 200px)',
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <div
        css={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
        }}
      >
        <div
          css={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: '60px',
            background: '#649BD2',
            alignItems: 'center',
            padding: '8px',
          }}
        >
          <Heading size="lg" color="white">
            LDAP Config
          </Heading>
          <CloseButton color="white" />
        </div>
        <Accordion
          allowToggle
          css={{
            width: '100%',
            background: '#ECECEC',
          }}
        >
          {sections.map(section => {
            const sectionData = payload.steps[section]
            const isSuccess = sectionData.pass

            return (
              <AccordionItem key={section}>
                {({ isExpanded }) => {
                  const isValidateSection = section === 'validate'
                  return (
                    <Fragment>
                      <AccordionButton>
                        <Box
                          css={{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: '20px',
                          }}
                        >
                          <Tag size="lg" colorScheme={isSuccess ? 'green' : 'red'}>
                            {isSuccess ? 'Pass' : 'Failed'}
                          </Tag>
                          <span>{`${getSectionTitle(section, payload)} (${section})`}</span>
                        </Box>
                        {!isValidateSection && <AccordionIcon />}
                      </AccordionButton>
                      {!isValidateSection && (
                        <AccordionPanel pb={4}>
                          {isExpanded && (
                            <SectionPanelContent
                              isSuccess={isSuccess}
                              section={section}
                              sectionData={sectionData}
                              userProfiles={userProfiles}
                            />
                          )}
                        </AccordionPanel>
                      )}
                    </Fragment>
                  )
                }}
              </AccordionItem>
            )
          })}
        </Accordion>
      </div>
    </div>
  )
}
