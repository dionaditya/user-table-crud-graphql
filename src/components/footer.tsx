import * as React from 'react'
import { Box, Divider, Flex, HStack, Icon, Link, Stack, Button } from '@chakra-ui/react'
import { useSocials } from '@/hooks/app'
import { FaCode, FaGithub } from 'react-icons/fa'

export const Footer: React.FC = () => {
  const socials = useSocials()

  return (
    <Stack as="footer" pb={16} pt={8} spacing={8}>
      <Box px={8}>
        <Divider />
      </Box>
      <Flex alignItems="flex-start" flexDir="row" justifyContent="space-between" px={8}>
        <Stack spacing={8}>
          <HStack spacing={6}>
            {socials.map(([href, SocialIcon]) => (
              <Link href={href} isExternal key={href}>
                <Icon as={SocialIcon} boxSize={5} />
              </Link>
            ))}
          </HStack>
        </Stack>
        <Button as="a" href={"#"} leftIcon={<Icon as={FaGithub} />}>
              View source on GitHub
        </Button>
      </Flex>
    </Stack>
  )
}
