import { ChevronDownIcon, ChevronLeftIcon } from '@chakra-ui/icons';
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
import { NavMenuDrawer } from './Modals/NavMenuDrawer';
import { useAccount, useDisconnect, useNetwork } from 'wagmi';

export default function MenuButtonComponent() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { address } = useAccount();
  return (
    <>
      <IconButton
        aria-label="Menu Button"
        icon={useBreakpointValue([<ChevronDownIcon />, <ChevronDownIcon />, <ChevronLeftIcon />])}
        variant="outline"
        w="fit-content"
        borderColor={useColorModeValue('gray.500', 'white')}
        opacity={0.5}
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
        size={['xs', 'sm']}
      >
        <DrawerOverlay />
        <DrawerContent
          borderTopRightRadius={['3xl', 0]}
          borderTopLeftRadius={['3xl']}
          borderBottomLeftRadius={[0, 0, '3xl']}
        >
          {/* <DrawerCloseButton /> */}
          <NavMenuDrawer
            address={address}
            onClose={onClose}
          />
        </DrawerContent>
      </Drawer>
    </>
  );
}
