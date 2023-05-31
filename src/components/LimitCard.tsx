import {
  Button,
  CircularProgress,
  Divider,
  Heading,
  Tag,
  Text,
  VStack,
} from '@chakra-ui/react';
import React from 'react';
import { CardContainer } from './CardContainer';
import { BalanceContainer } from './BalanceContainer';
import { FcDoughnutChart } from 'react-icons/fc';

function LimitCard() {
  return (
    <CardContainer heading="Limits" icon={FcDoughnutChart}>
      <CircularProgress
        size="150px"
        value={20}
        color="yellow.500"
        thickness="16px"
      ></CircularProgress>
      <BalanceContainer heading="Max Rewards" value={111111}></BalanceContainer>
      <BalanceContainer
        heading="Rewards Claimed"
        value={111111}
      ></BalanceContainer>
      <BalanceContainer
        heading="Remaining Rewards"
        value={111111}
      ></BalanceContainer>
    </CardContainer>
  );
}

export default LimitCard;
