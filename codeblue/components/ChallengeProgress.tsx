import { Text, Icon, HStack, Spacer } from '@chakra-ui/react'
import { FaFlagCheckered } from 'react-icons/fa'
import { GiCheckMark } from 'react-icons/gi'

interface ChallengeProgressProps {
  challenge: number;
  points: number;
}

export default function ChallengeProgress({
  challenge,
  points
}: ChallengeProgressProps) {
  return (
    <>
      <HStack spacing={5} p={4} alignItems='center'>
        <Icon as={FaFlagCheckered} color='gray.50' fontSize='25' mr={6} />
        <Text
          color='gray.100'
          fontSize='25'
        >Desafio {challenge}</Text>
        <Icon as={GiCheckMark} color='success' />

        <Text
          color='brand.800'
          fontSize='25'
        >{points} pontos</Text>
      </HStack>
    </>
  )
}