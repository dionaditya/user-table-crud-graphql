/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react'
import React from 'react'
import { screen, fireEvent, act } from '@testing-library/react'
import { useQuery } from 'react-query'
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box, Tag } from '@chakra-ui/react'
import { renderWithQueryClient } from '../../utils/testUtils'
import mockPorfilesData from '../../__mocks__/profiles.json'
import mockPayload from '../../__mocks__/payload.json'
import { ldapconfigApi } from '../../api/ldapConfig/ldapConfig.api'
import { LDAPConfig, getSectionTitle } from './LDAPConfig'


describe('component: LDAPConfig', () => {
  const similarSectionContent =   ['user', 'details']

  it('render all section correctly', async () => {
    jest.useFakeTimers()

    await act(async () => {
      await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
      jest.runAllTimers()
    })

    mockPayload.order.forEach(section => {
      expect(screen.queryByText(`${getSectionTitle(section, mockPayload)} (${section})`)).not.toBeNull()
    })

    expect(screen.queryAllByText('Pass').length).toEqual(6)

    expect(screen.queryAllByText('Failed').length).toEqual(1)

    jest.useRealTimers()
  })

  it('render ldap config settings section correctly', async () => {
    jest.useFakeTimers()

    await act(async () => {
      await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
      jest.runAllTimers()
    })

    mockPayload.order.forEach(section => {
      expect(screen.queryByText(`${getSectionTitle(section, mockPayload)} (${section})`)).not.toBeNull()
    })

    expect(screen.queryAllByText('Pass').length).toEqual(6)

    expect(screen.queryAllByText('Failed').length).toEqual(1)

    act(() => {
      fireEvent.click(screen.getByText(`${getSectionTitle('settings', mockPayload)} (settings)`))
    })

    expect(screen.queryByText(/Hello/)).not.toBeNull()

    const attributeNames = Object.keys(mockPayload.steps['settings'].data[1])

    attributeNames.forEach((attributeName) => {
      expect(screen.queryByText(attributeName)).not.toBeNull()

      const attributeValues = mockPayload.steps['settings'].data[1][attributeName]

      attributeValues.forEach(attributeValue => {
        expect(screen.queryByText(attributeValue)).not.toBeNull()
      });
    })

    jest.useRealTimers()
  })


  similarSectionContent.forEach((sectionTitle) => {
    it(`should render ${sectionTitle} panel content correctly`, async () => {
      jest.useFakeTimers()
  
      await act(async () => {
        await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
        jest.runAllTimers()
      })
  
      act(() => {
        fireEvent.click(screen.getByText(`${getSectionTitle(sectionTitle, mockPayload)} (${sectionTitle})`))
      })
  
      const attributeNames = Object.keys(mockPayload.steps[sectionTitle].data[1])
  
      attributeNames.forEach((attributeName) => {
        expect(screen.queryByText(attributeName)).not.toBeNull()
  
        const attributeValues = mockPayload.steps[sectionTitle].data[1][attributeName]
  
        attributeValues.forEach(attributeValue => {
          expect(screen.queryByText(attributeValue)).not.toBeNull()
        });
      })
  
      jest.useRealTimers()
    })
  })

  it(`should render assertions panel content correctly`, async () => {
    jest.useFakeTimers()

    await act(async () => {
      await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
      jest.runAllTimers()
    })

    act(() => {
      fireEvent.click(screen.getByText(`${getSectionTitle('assertions', mockPayload)} (${'assertions'})`))
    })

    const attributeNames = Object.keys(mockPayload.steps['assertions'].data)

    attributeNames.forEach((attributeName) => {
      expect(screen.queryByText(attributeName)).not.toBeNull()

      const attributeValues = mockPayload.steps['assertions'].data[attributeName]

      attributeValues.forEach(attributeValue => {
        expect(screen.queryAllByText(attributeValue).length).toBeGreaterThanOrEqual(1)
      });
    })

    jest.useRealTimers()
  })

  it(`should render mappings section panel content correctly`, async () => {
    jest.useFakeTimers()

    await act(async () => {
      await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
      jest.runAllTimers()
    })

    act(() => {
      fireEvent.click(screen.getByText(`${getSectionTitle('mappings', mockPayload)} (${'mappings'})`))
    })

    expect(screen.queryByText('undefined')).not.toBeNull()

    expect(screen.queryByText('id=1,name=standard'))

    jest.useRealTimers()
  })

  it('should render profile section panel content correctly', async () => {
    jest.useFakeTimers()

    await act(async () => {
      await renderWithQueryClient(LDAPConfig, { payload: mockPayload })
      jest.runAllTimers()
    })

    act(() => {
      fireEvent.click(screen.getByText(`${getSectionTitle('profile', mockPayload)} (${'profile'})`))
    })

    const profileAttributesName = ['processing', 'policies', 'profile', 'allowed', 'evaluations']

    profileAttributesName.forEach((attributeName) => {
      expect(screen.queryByText(attributeName)).not.toBeNull()
    })

    expect(screen.queryByText('policies_ordered [86, 1, 2, 3]')).not.toBeNull()
    expect(screen.queryByText('policies_filtered [1, 2, 3, 86]')).not.toBeNull()
    expect(screen.queryByText('policies_with_operations [1, 2, 3, 86]')).not.toBeNull()
    expect(screen.queryByText('[2]')).not.toBeNull()
    expect(screen.queryByText('Profile10'))

    expect(screen.queryByText('Clone4')).not.toBeNull()
    expect(screen.queryByText('Clone1')).not.toBeNull()
    expect(screen.queryByText('Profile1')).not.toBeNull()

    expect(screen.queryByText('LDAP Filter not specified.')).not.toBeNull()
    expect(screen.queryByText('LDAP Filter too specific, no results returned, filter:(&(&(objectClass=user)(mail=john.doe+test@mycompany.com))(distinguishedName=CN=John Doe,CN=Users,DC=mycompanySharePoint,DC=com))')).not.toBeNull()
    expect(screen.queryByText('Allowed')).not.toBeNull()
  })
  
})
