import * as React from 'react'
import { Box, ChakraProvider, Stack } from '@chakra-ui/react'
import { DefaultSeo, SocialProfileJsonLd } from 'next-seo'
import Head from 'next/head'
import NProgress from 'nprogress'
import Router from 'next/router'
import dynamic from 'next/dynamic'

import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { theme } from '@/theme'
import siteConfig from '~/site-config'

import type { AppProps } from '@/types/next'

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const MobileDrawer = dynamic(() => import('@/components/mobile-drawer').then(C => C.MobileDrawer))

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

function App(props: AppProps) {
  const { Component, pageProps, router } = props

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <DefaultSeo
        title="Welcome!"
        titleTemplate={`%s · ${siteConfig.title}`}
        description={siteConfig.description}
        canonical={siteConfig.url + (router.asPath || '')}
        openGraph={{
          title: siteConfig.title,
          description: siteConfig.description,
          type: 'website',
          site_name: siteConfig.title,
          images: [
            {
              url: `${siteConfig.url}/social.png`,
              width: 1024,
              height: 512,
              alt: siteConfig.title,
            },
          ],
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: siteConfig.twitterUsername,
          site: siteConfig.twitterUsername,
        }}
      />

      <SocialProfileJsonLd
        type="person"
        name={siteConfig.title}
        url={siteConfig.url}
        sameAs={Object.values(siteConfig.socials)}
      />

      
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          {Component.disableLayout ? (
            <Component {...pageProps} />
          ) : (
            <>
                <Stack justify="space-between" minH="100vh" spacing={0}>
                <Box as="main">
                  <Component {...pageProps} />
                </Box>
                <Footer />
              </Stack>

              <MobileDrawer />
            </>
          )}
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      
     
    </>
  )
}

export default App
