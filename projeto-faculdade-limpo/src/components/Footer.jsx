import { Box, Flex, Heading, Text, VStack, Link, Input, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom'; // Para links internos

export default function Footer() {
  
  const CustomGold = "#A5874D";
  const DarkText = "#292728";

  return (
    
    <Box as="footer" bg="#f3e6cf" p={{ base: 8, md: 10 }}>
      <Flex
        maxW="container.xl"
        margin="auto"
        direction={{ base: 'column', md: 'row' }} 
        justify="space-between"
        gap={8} 
      >
        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1.5}>
          <Heading size="md" fontWeight="bold">
            <Text as="span" color={DarkText}>All</Text>
            <Text as="span" color={CustomGold}>Serve</Text>
          </Heading>
          <Text fontSize="sm" textAlign={{ base: 'center', md: 'left' }}>
            2025 AllServe. Todos os direitos reservados.
          </Text>
        </VStack>

       
        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1}>
          <Heading size="sm">Links</Heading>
          <Link as={RouterLink} to="/">Home</Link>
          <Link as={RouterLink} to="/buscar">Profissionais</Link>
          <Link as={RouterLink} to="/sobre">Sobre</Link>
        </VStack>

        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={1}>
          <Heading size="sm">Help</Heading>
          <Link href="#">Payment Options</Link>
          <Link href="#">Returns</Link>
          <Link href="#">Privacy Policies</Link>
        </VStack>

        
        <VStack align={{ base: 'center', md: 'flex-start' }} spacing={3} flex={2}>
          <Heading size="sm">Newsletter</Heading>
          <Flex as="form" width="full" maxW={{ base: '300px', md: '100%' }}>
            <Input
              placeholder="Enter your email"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              borderRadius="md"
              _focus={{ borderColor: CustomGold }}
            />
            <Button
              bg={CustomGold}
              color="white"
              ml={2}
              _hover={{ bg: "#8C713B" }}
              type="submit"
            >
              SUBSCRIBE
            </Button>
          </Flex>
        </VStack>
      </Flex>
    </Box>
  );
}