import { ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  Spacer,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Web3Button } from '@web3modal/react';

export default function MenuButtonComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="Menu Button"
        icon={<ChevronDownIcon />}
        variant="outline"
        w="fit-content"
        borderColor={useColorModeValue('gray.500', 'white')}
        opacity={0.5}
        borderRadius="xl"
        size="sm"
        _hover={{
          bg: 'transparent',
          opacity: 1,
        }}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement={useBreakpointValue(['bottom', 'bottom', 'right'])}
        onClose={onClose}
        preserveScrollBarGap={true}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRightRadius={['3xl', 0]}
          borderTopLeftRadius={['3xl']}
          borderBottomLeftRadius={[0, 0, "3xl"]}
        >
          <DrawerCloseButton />
          <DrawerHeader></DrawerHeader>
          <DrawerBody></DrawerBody>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
