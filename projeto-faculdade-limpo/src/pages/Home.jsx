import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, Text, Button, Container, SimpleGrid, 
  Image, Flex, Spinner, Center, Link as ChakraLink 
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase/config';
import BartenderCard from '../components/BartenderCard.jsx';
// Importe os assets dos ícones de serviço se os usar
import Tradicional from '../assets/tradicional-icon.png';
import Barista from '../assets/barista-icon.png';
import Showman from '../assets/showman-icon.png';
import './Home.css';
// Cores usadas com frequencia
const PrimaryBg = "#E9E0D4"; 
const CardBg = "#F9F5EE"; 
const CustomGold = "#A5874D"; 
const DarkText = "#292728";
const LightText = "#707070";

// Cards de 'serviços' (Estes podem continuar estáticos)
const servicesData = [
  { 
    id: 'tradicional', 
    name: 'Tradicional', 
    title: 'Barman Clássico/Tradicional',
    description: 'Muito requisitado em festas formais, jantares de gala e bares sofisticados, já que domina os coquetéis clássicos e o atendimento elegante.', 
    imgSrc: Tradicional
  }, 
  { 
    id: 'barista', 
    name: 'Barista', 
    title: 'Especialista em Cafés',
    description: 'Profissional treinado para preparar e servir bebidas à base de café, com foco em arte e qualidade. Perfeito para eventos matinais ou de encerramento.', 
    imgSrc: Barista
  }, 
  { 
    id: 'showman', 
    name: 'Showman', 
    title: 'Flair Bartender',
    description: 'Bartender que incorpora manobras acrobáticas com garrafas e utensílios, proporcionando um espetáculo visual e entretenimento para os convidados.', 
    imgSrc: Showman 
  },
];

// Componente para o Card de Serviço (Estado Inicial)
const InitialServiceCard = ({ service, onClick }) => (
    <Box
        p={0}
        bg="white" 
        borderRadius="lg"
        boxShadow="md"
        textAlign="center"
        overflow="hidden"
        transition="0.2s"
        onClick={() => onClick(service)}
        cursor="pointer"
        _hover={{ 
             boxShadow: 'xl', 
             transform: 'translateY(-2px)', 
             transition: '0.2s',
        }}
    >
        <Box
            bg="#EBDDA3"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {service.imgSrc && (
                <Image 
                    src={service.imgSrc} 
                    alt={`Ilustração ${service.name}`}
                    maxH="100%" 
                    maxW="100%" 
                    objectFit="contain" 
                    p={1}
                />
            )}
            {!service.imgSrc && (
                <Text fontSize="lg" color={CustomGold} fontWeight="bold">Ilustração {service.name}</Text>
            )}
        </Box>

        <Text 
            fontWeight="semibold" 
            fontSize="lg" 
            color={DarkText} 
            py={4}
        >
            {service.name}
        </Text>
    </Box>
);

// Componente para o Card de Serviço (Detalhado)
const DetailServiceCard = ({ service, onBack }) => (
    <Box
        p={{ base: 6, md: 10 }}
        bg="white" 
        borderRadius="lg"
        boxShadow="xl"
        textAlign="left"
        maxWidth={{ base: '100%', lg: '800px' }}
        mx="auto"
        display="flex"
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems="center"
    >
      <Box
          flexShrink={0}
          width={{ base: '100%', md: '40%' }}
          height={{ base: '200px', md: '300px' }}
          borderRadius="lg"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mb={{ base: 4, md: 0 }}
          mr={{ md: 6 }}
      >
            <Image 
                src={service.imgSrc} 
                alt={`Ilustração ${service.name}`} 
                maxH="100%" 
                maxW="100%" 
                objectFit="contain" 
            />
      </Box>

      <Box flexGrow={1}>
            <Text fontSize="md" color={LightText} mb={1} fontWeight="medium">{service.name}</Text>
            <Heading as="h3" size="xl" color={CustomGold} mb={4}>
                {service.title}
            </Heading>
            <Text fontSize="md" color={LightText} mb={6}>
                {service.description}
            </Text>
            {/* Corrigido para usar RouterLink e apontar para a busca */}
            <Button 
                as={RouterLink}
                to="/buscar"
                bg={CustomGold} 
                color="white"
                size="md"
                _hover={{ bg: "#8C713B" }} 
            >
                CONTRATAR AGORA
            </Button>
            <Button variant="link" size="sm" ml={4} onClick={onBack} color="gray.500">
                Voltar
            </Button>
      </Box>
    </Box>
);

// O ProfessionalCard estático e professionalsData foram removidos

export default function Home() {
  const [selectedService, setSelectedService] = useState(null); 
  const [profissionais, setProfissionais] = useState([]); // Estado para os bartenders reais
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // useEffect para buscar os profissionais do Firestore quando o componente carregar
  useEffect(() => {
    const fetchProfissionaisDestaque = async () => {
      setLoading(true);
      try {
        // 1. Busca 4 utilizadores que são bartenders
        const q = query(
          collection(db, 'users'), 
          where('role', '==', 'bartender'), 
          limit(4) // Limita a 4 destaques
        );
        const querySnapshot = await getDocs(q);
        let bartendersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // 2. Para cada bartender, busca a sua média de avaliação
        // (Esta lógica é idêntica à da sua página BuscarBartenders.jsx)
        for (let bartender of bartendersList) {
          const avaliacoesRef = collection(db, 'users', bartender.id, 'avaliacoes');
          const avaliacoesSnap = await getDocs(avaliacoesRef);
          const avaliacoes = avaliacoesSnap.docs.map(doc => doc.data());
          
          if (avaliacoes.length > 0) {
            const totalNotas = avaliacoes.reduce((acc, curr) => acc + curr.nota, 0);
            bartender.mediaAvaliacao = totalNotas / avaliacoes.length;
            bartender.totalAvaliacoes = avaliacoes.length;
          } else {
            bartender.mediaAvaliacao = 0;
            bartender.totalAvaliacoes = 0;
          }
        }
        
        setProfissionais(bartendersList); // Guarda os bartenders reais no estado
      } catch (error) {
        console.error("Erro ao buscar profissionais em destaque:", error);
      } finally {
        setLoading(false); // Termina o carregamento
      }
    };

    fetchProfissionaisDestaque();
  }, []); // O array vazio [] faz com que isto execute apenas uma vez

  
  return (
    <Box>
      {/* -------------------- SEÇÃO 1: Início (Capa) -------------------- */}
      <Box 
        bg={PrimaryBg} 
        minH={{ base: '600px', md: '90vh' }} 
        id='inicio'
        position="relative"
        overflow="hidden"
        paddingY={{base: 8, md: 0}}
        display="flex" 
        alignItems="center" 
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          zIndex="0"
          className="HomeCapa" // Do seu Home.css
        />

        <Container 
          maxW="container.xl" 
          position="relative"
          zIndex="1"
        >
          <Box
            maxWidth={{ base: '90%', md: '500px' }} 
            bg={CardBg} 
            p={{ base: 6, md: 8 }} 
            borderRadius="lg"
            boxShadow="xl" 
            textAlign="left" 
            marginLeft={{ base: 'auto', md: 'auto' }} 
            marginRight={{ base: 'auto', md: '0' }}
          >
            <Text fontSize="md" color={LightText} mb={2} fontWeight="medium">
              Bem-vindo ao AllServe
            </Text>
            <Heading 
              as="h1" 
              size={{ base: 'xl', md: '1xl' }} 
              fontWeight="extrabold"
              mb={4}
              color={CustomGold} 
              lineHeight="1.2" 
            >
              Ache o bartender ideal para o seu evento
            </Heading>
            <Text fontSize="md" mb={6} color={LightText}> 
              Conecte-se com profissionais qualificados para tornar sua festa inesquecível.
            </Text>
            <Button 
              as={RouterLink}
              to="/buscar" // Link para a página de busca real
              bg={CustomGold} 
              color="white"
              size="lg"
              _hover={{ bg: "#8C713B" }} 
              py={5} 
              px={6}
            >
              CONTRATAR AGORA
            </Button>
          </Box>
        </Container>
      </Box>

      {/* -------------------- SEÇÃO 2: Sobre (Serviços) -------------------- */}
      <Box 
          p={8} 
          textAlign="center" 
          py={{ base: 12, md: 20 }} 
          bg="white"
          id='sobre'
      > 
          <Container maxW="container.xl">
              <Heading 
                  as="h2" 
                  size={{ base: 'xl', md: '1xl' }} 
                  fontWeight="extrabold" 
                  mb={2}
                  color={DarkText}
              >
                  Nossos serviços
              </Heading>
              <Text
                  fontSize={{ base: 'md', md: 'lg' }} 
                  mb={12} 
                  fontWeight="medium"
                  color="gray.500" 
              >
                  Escolha o tipo de profissional ideal para sua ocasião.
              </Text>

              {/* A lógica do modal de serviços (selectedService) permanece igual */}
              {selectedService ? (
                  <DetailServiceCard 
                      service={selectedService} 
                      onBack={() => setSelectedService(null)} 
                  />
              ) : (
                  <SimpleGrid 
                      columns={{ base: 1, sm: 3 }} 
                      spacing={10}
                      justifyContent="center"
                      maxWidth="900px" 
                      mx="auto" 
                  >
                      {servicesData.map((service) => (
                          <InitialServiceCard 
                              key={service.id} 
                              service={service} 
                              onClick={setSelectedService} 
                          />
                      ))}
                  </SimpleGrid>
              )}
          </Container>
      </Box>

      
      {/* -------------------- SEÇÃO 3: Profissionais (AGORA COM DADOS REAIS) -------------------- */}
      <Box 
        p={8} 
        textAlign="center" 
        py={{ base: 12, md: 20 }} 
        bg="white" 
        id="profissionais" 
      > 
          <Container maxW="container.xl">
              <Heading 
                  as="h2" 
                  size="1xl" 
                  fontWeight="extrabold" 
                  mb={12} 
                  color={DarkText}
              >
                  Profissionais em Destaque
              </Heading>

              {/* Cards dinâmicos */}
              {loading ? (
                <Center h="200px"><Spinner size="xl" /></Center>
              ) : (
                <SimpleGrid 
                    columns={{ base: 2, md: 3, lg: 4 }}
                    spacing={6}
                >
                    {/* Usa o BartenderCard real, vindo de /components */}
                    {profissionais.map((bartender) => (
                        <BartenderCard key={bartender.id} bartender={bartender} />
                    ))}
                </SimpleGrid>
              )}

              <Button
                  as={RouterLink}
                  to="/buscar" 
                  variant="outline"
                  mt={12}
                  size="lg"
                  color={CustomGold}
                  borderColor={CustomGold}
                  _hover={{ bg: CustomGold, color: 'white' }}
              >
                  Mostrar mais
              </Button>
          </Container>
      </Box>
    </Box>
  );
}