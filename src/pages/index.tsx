/** @jsxImportSource @emotion/react */
import * as React from 'react'
import { jsx, css } from '@emotion/react'
import { Button, Heading, Icon, Stack, Wrap, WrapItem, VStack } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { UserDashboard } from '@/features/UserDashboard'

import HomeIcon from '../public/home-icon.svg'


import siteConfig from '~/site-config'

import type { NextPage } from '@/types/next'

const Navbar = () => {
  return (
    <VStack alignItems="left">
      <Button
        background="transparent"
        leftIcon={<HomeIcon />}
        justifyContent="left"
        marginBottom="10px"
        css={{
          '&:hover': {
            background: 'transparent',
            border: '1px solid white',
            borderRadius: '4px',
          },
        }}
      >
        <span
          css={{
            marginLeft: '24px',
          }}
        >
          Dashboard
        </span>
      </Button>
    </VStack>
  )
}

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo title={siteConfig.title} titleTemplate="%s" />
      <div
        css={{
          display: 'flex',
          flexDirection: 'row',
          background: '#2E4CD4',
        }}
      >
        <div
          css={{
            width: '18%',
            height: '100%',
            background: '#2E4CD4',
            padding: '24px 24px',
            color: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 4,
          }}
        >
          <Heading
            size="lg"
            css={{
              marginBottom: '24px',
            }}
          >
            {siteConfig.title}
          </Heading>

          <Navbar />
        </div>
        <div
          css={{
            width: '82%',
            height: '100%',
            minHeight: '100vh',
            borderTopLeftRadius: '30px',
            borderBottomLeftRadius: '30px',
            padding: '20px',
            background: '#F5F7FB',
          }}
        >
          <Stack alignItems="center" px={8} spacing={4} textAlign="center" w="full">
            <Heading size="2xl">{siteConfig.title}</Heading>
            <Heading fontWeight="normal" pb={8} size="md">
              {siteConfig.description}
            </Heading>

            <Wrap justify="center" spacing={4}>
              <UserDashboard />
            </Wrap>
          </Stack>
        </div>
        {/* <div
          css={{
            width: '10%',
            height: '100%',
            minHeight: '100vh',
            padding: '20px',
            background: '#F5F7FB',
            borderLeft: '1px solid red',
            zIndex: 4,
            position: 'sticky',
            top: 0,
          }}
        ></div> */}
      </div>
    </>
  )
}

export default HomePage
