/* istanbul ignore file */
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { render } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../theme'

interface IAdhocProvider {
  children: JSX.Element | JSX.Element[]
}

const AdhocProvider: React.FC<IAdhocProvider> = props => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      {props.children}
    </ChakraProvider>
  )
}

export const renderWithQueryClient = async (Component, props = {}) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
    },
  })
  let component

  await act(async () => {
    component = render(
      <QueryClientProvider client={queryClient}>
        <AdhocProvider>
          <Component {...props} />
        </AdhocProvider>
      </QueryClientProvider>,
    )
  })
  return component
}
