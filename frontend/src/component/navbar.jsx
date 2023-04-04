import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
   
    const token = window.localStorage.getItem("token")

    
    if(token){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[window.localStorage.getItem("token")]);

  return (
    <Box
       sx={{ position: "sticky", top: 0, zIndex: 99 }}
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link to="/">
              <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}>
              Logo
            </Text>
          </Link>
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {isLogin && (

            <Link to = "/create">
              <Button colorScheme="blackAlpha">
                Create New Book
              </Button>
            </Link>
          )

          }
          {!isLogin ? (
              <Button
              as={'a'}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              bg={'teal.400'}
              href={'/login'}
              _hover={{
                bg: 'teal.300',
              }}>
              Sign In
            </Button>
            ) : (
              <Button
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              bg={'teal.400'}
              _hover={{
              bg: 'teal.300'
              }}
              onClick={()=>{
                window.localStorage.removeItem("token")
                setIsLogin(false)
              }}
              >
              Sign Out
            </Button>
            )
          } 
        </Stack>
      </Flex>
      {/* <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse> */}
    </Box>
  );
}

