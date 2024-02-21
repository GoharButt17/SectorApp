// SectorsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Box,
    HStack,
    VStack,
    Text
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import CustomButton from '../Components/CustomButton';

const SectorsPage = ({sectors,onDeleteSector,onEditSector}) => {
    const navigate = useNavigate();

    const handleEdit = (index) => {
        const editSector = sectors[index];
        onEditSector(editSector,index);
        navigate('/edit');
    }

    const handleDelete = async (index) => {
        try {
          // Call the onDeleteSector function with the index of the sector to be deleted
            const deletedSector = onDeleteSector(index);
            const sectorId = sectors[index]._id;
            // Make a request to the server to delete the sector
            const response = await fetch(`http://localhost:3000/delSectors/${sectorId}`, {
                method: 'DELETE',
        });
    
        if (response.ok) {
            console.log(`Sector deleted successfully: ${JSON.stringify(deletedSector)}`);
        } else {
            console.error('Failed to delete sector:', response.status);
        }
    } catch (error) {
            console.error('Error deleting sector:', error);
    }
};

    const handleButtonClick = () => {
        navigate('/form');
    }
    return (
        <div>
            <Box
                height='100vh'
                display='flex'
                alignItems='center'
                justifyContent='center'
                bgColor='#f7f9fa'
                flexDirection='column'
            >
                <VStack
                    borderRadius='lg'
                    backgroundColor='white'
                    p='8'
                    boxShadow='lg'
                    transition='box-shadow 0.3s ease-in-out'
                    _hover={{
                        boxShadow: 'xl',
                    }}
                    h='80%'
                    overflow= 'hidden'
                >
                    <HStack
                        justifyContent='space-between'
                        w='100%'
                        mb='4'
                    >
                        <Text fontSize='xl'>SECTORS</Text>
                        <CustomButton ButtonText = "ADD SECTOR" onClick={handleButtonClick} />
                    </HStack>
                    <TableContainer overflowY='auto'>
                        <Table variant='simple'>
                            <TableCaption>SECTORS LIST</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>#</Th>
                                    <Th>Name</Th>
                                    <Th>Sector</Th>
                                    <Th>Agree To Terms</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {sectors.length > 0 ? (
                                    sectors.map((sector, index) => (
                                        <Tr key={index}>
                                            <Td>{index + 1}</Td>
                                            <Td>{sector.userName}</Td>
                                            <Td>{sector.sectorName}</Td>
                                            <Td>{sector.termsAndConditions ? "Yes" : "No"}</Td>
                                            <Td>
                                                <Menu>
                                                    <MenuButton
                                                        as={IconButton}
                                                        aria-label='Options'
                                                        icon={<HamburgerIcon />}
                                                        variant='outline'
                                                    />
                                                    <MenuList>
                                                        <MenuItem onClick={() => handleEdit(index)}>
                                                            Edit
                                                        </MenuItem>
                                                        <MenuItem onClick={() => handleDelete(index)}>
                                                            Delete
                                                        </MenuItem>
                                                    </MenuList>
                                                </Menu>
                                            </Td>
                                        </Tr>
                                    ))
                                ) : (
                                    <Tr>
                                        <Td colSpan="5" textAlign="center"><Text fontSize='xl'>No Data Available</Text></Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </VStack>
            </Box>
        </div>
    );
};

export default SectorsPage;
