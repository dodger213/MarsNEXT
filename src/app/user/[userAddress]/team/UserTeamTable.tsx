import { AddressZero } from '@/constants/SupportedNetworkInfo';
import {
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { shortenAddress } from '@usedapp/core';
import React from 'react';

function UserTeamTable() {
  return (
    <TableContainer w="full">
      <Table size="lg">
        <Thead>
          <Tr>
            <Th>Level</Th>
            <Th>Address</Th>
            <Th isNumeric>Referred By</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td><Tag size="lg" borderRadius="xl">{shortenAddress(AddressZero)}</Tag></Td>
            <Td isNumeric><Tag size="lg" borderRadius="xl">{shortenAddress(AddressZero)}</Tag></Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default UserTeamTable;
