import { AddressZero } from '@/constants/SupportedNetworkInfo';
import { useGetUserTeam } from '@/hooks/ReferralHooks';
import {
  Heading,
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
import UserTeamTableComponent from './UserTeamTableComponent';

function UserTeamTable({
  params,
}: {
  params: {
    userAddress: `0x${string}` | undefined;
  };
}) {
  const userTeamObject = useGetUserTeam(params.userAddress);
  const userTeamCount = userTeamObject.teamCount;
  const userTeamAddress = userTeamObject.team;
  const userTeamLevels = userTeamObject.teamLevels;
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
          {userTeamCount > 0 ? (
            userTeamAddress.map((address, key) => {
              return (
                <UserTeamTableComponent
                  key={key}
                  level={key}
                  userAddress={address}
                  userTeamLevels={userTeamLevels}
                ></UserTeamTableComponent>
              );
            })
          ) : (
            <Heading size="sm" color="red">
              No team
            </Heading>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default UserTeamTable;
