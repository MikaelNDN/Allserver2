import React from "react";
import {
  Box,
  Flex,
  Text,
  Button,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Heading,
  Spacer,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useCart } from "../context/CartContext.jsx";
import {
  FaUserCircle,
  FaShoppingCart,
  FaSearch,
  FaTachometerAlt,
  FaBars,
} from "react-icons/fa";

const PrimaryColor = "#C49A3D"; // dourado suave
const TextColor = "#333333"; // cinza escuro

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartItemCount = Array.isArray(cart) ? cart.length : 0;

  return (
    <Box
      bg="white"
      px={6}
      py={3}
      boxShadow="sm"
      position="fixed"
      top="0"
      width="100%"
      zIndex="1000"
    >
      <Flex
        h={16}
        alignItems="center"
        justifyContent="space-between"
        maxW="container.xl"
        mx="auto"
      >
        {/* Logo */}
        <Heading as="h1" size="md" letterSpacing="tight">
          <ChakraLink as={RouterLink} to="/" _hover={{ textDecoration: "none" }}>
            <Text as="span" color={TextColor} fontWeight="bold">
              All
            </Text>
            <Text as="span" color={PrimaryColor} fontWeight="bold">
              Serve
            </Text>
          </ChakraLink>
        </Heading>

        <Spacer />

        {/* Links Desktop */}
        <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
          <ChakraLink
            as={RouterLink}
            to="/"
            p={2}
            color={TextColor}
            _hover={{ color: PrimaryColor, textDecoration: "none" }}
          >
            Início
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/sobre"
            p={2}
            color={TextColor}
            _hover={{ color: PrimaryColor, textDecoration: "none" }}
          >
            Sobre
          </ChakraLink>
          <ChakraLink
            as={RouterLink}
            to="/buscar"
            p={2}
            color={TextColor}
            _hover={{ color: PrimaryColor, textDecoration: "none" }}
          >
            Profissionais
          </ChakraLink>

          {/* Ícones */}
          <ChakraLink as={RouterLink} to="/buscar" aria-label="Buscar Bartenders">
            <IconButton
              icon={<FaSearch />}
              variant="ghost"
              color={TextColor}
              _hover={{ color: PrimaryColor, bg: "transparent" }}
              ml={3}
            />
          </ChakraLink>

          {user && user.role === "bartender" && (
            <ChakraLink as={RouterLink} to="/dashboard" aria-label="Dashboard">
              <IconButton
                icon={<FaTachometerAlt />}
                variant="ghost"
                color={TextColor}
                _hover={{ color: PrimaryColor, bg: "transparent" }}
                ml={2}
              />
            </ChakraLink>
          )}

          <ChakraLink as={RouterLink} to="/carrinho" aria-label="Carrinho">
            <Box position="relative">
              <IconButton
                icon={<FaShoppingCart />}
                variant="ghost"
                color={TextColor}
                _hover={{ color: PrimaryColor, bg: "transparent" }}
                ml={2}
              />
              {cartItemCount > 0 && (
                <Text
                  as="span"
                  bg="red.500"
                  color="white"
                  borderRadius="full"
                  px="2"
                  fontSize="xs"
                  position="absolute"
                  top="-1"
                  right="-1"
                >
                  {cartItemCount}
                </Text>
              )}
            </Box>
          </ChakraLink>

          {user ? (
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<FaUserCircle />}
                variant="ghost"
                color={TextColor}
                _hover={{ color: PrimaryColor, bg: "transparent" }}
                ml={2}
                aria-label="Menu do Usuário"
              />
              <MenuList>
                <MenuItem as={RouterLink} to="/perfil">
                  Meu Perfil
                </MenuItem>
                <MenuItem onClick={logout}>Sair</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              color={PrimaryColor}
              variant="outline"
              size="sm"
              ml={4}
              borderColor={PrimaryColor}
              _hover={{ bg: PrimaryColor, color: "white" }}
            >
              Login
            </Button>
          )}
        </Flex>

        {/* Menu Mobile */}
        <Box display={{ base: "flex", md: "none" }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FaBars />}
              variant="ghost"
              color={TextColor}
              aria-label="Abrir Menu"
            />
            <MenuList>
              <MenuItem as={RouterLink} to="/">
                Início
              </MenuItem>
              <MenuItem as={RouterLink} to="/sobre">
                Sobre
              </MenuItem>
              <MenuItem as={RouterLink} to="/buscar">
                Profissionais
              </MenuItem>
              <MenuItem as={RouterLink} to="/carrinho">
                Carrinho ({car})
              </MenuItem>
              {user ? (
                <>
                  <MenuItem as={RouterLink} to="/perfil">
                    Meu Perfil
                  </MenuItem>
                  <MenuItem onClick={logout}>Sair</MenuItem>
                </>
              ) : (
                <MenuItem as={RouterLink} to="/login">
                  Login
                </MenuItem>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
}
