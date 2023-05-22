import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

import { BsChatSquareQuote } from 'react-icons/bs';
import { RiShutDownLine, RiRestartLine, RiFileShredLine } from 'react-icons/ri';

export default function MenuButtonComponent() {
  return (
    <Flex justifyContent="center" mt={4}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="Menu Button"
            icon={<ChevronDownIcon />}
            variant="outline"
            w="fit-content"
            borderColor={useColorModeValue("gray.500", "white")}
            opacity={0.5}
            borderRadius="xl"
            size="sm"
            _hover={{
              bg: 'transparent',
              opacity: 1
            }}
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: 'none' }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<BsChatSquareQuote />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="sm"
              >
                Request Access
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<RiFileShredLine />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Purge Redis Cache
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<RiRestartLine />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Restart Server
              </Button>
              <Button
                w="194px"
                variant="ghost"
                rightIcon={<RiShutDownLine />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Disable Server
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
}
