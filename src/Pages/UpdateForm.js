// FormPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
import CustomInputField from '../Components/CustomInputField';
import { Box, VStack } from '@chakra-ui/react';
import CheckBox from '../Components/CheckBox';
import CustomButton from '../Components/CustomButton';

const UpdateForm = ({ onAddSector,sectorToEdit }) => {
    const navigate = useNavigate();  // Create a navigate function

    const [formData, setFormData] = useState({
        userName: sectorToEdit ? sectorToEdit.userName : '',
        sectorName: sectorToEdit ? sectorToEdit.sectorName : '',
        termsAgreed: sectorToEdit ? sectorToEdit.termsAndConditions : false,
    });

    const handleNameChange = (e) => {
        setFormData((prevData) => ({ ...prevData, userName: e.target.value }));
    };

    const handleSectorChange = (e) => {
        setFormData((prevData) => ({ ...prevData, sectorName: e.target.value }));
    };

    const handleTermsChange = (e) => {
        setFormData((prevData) => ({ ...prevData, termsAgreed : e.target.checked }));
    };

    const handleSubmit = () => {
        if (!formData.userName || !formData.sectorName || !formData.termsAgreed) {
            alert('Please fill in all fields and agree to the terms and conditions');
            return;
        }

        // Pass the new sector data to the onAddSector prop
        onAddSector({
            userName: formData.userName,
            sectorName: formData.sectorName,
            termsAndConditions: formData.termsAgreed,
        });

        // Clear the form data after submission
        setFormData({
            userName: '',
            sectorName: '',
            termsAgreed: false,
        });

        // Navigate to the SectorsPage component
        navigate('/');
    };

    return (
        <Box
            height='100vh'
            display='flex'
            alignItems='center'
            justifyContent='center'
            bgColor='#f7f9fa'
        >
            <VStack
                borderRadius='md'
                backgroundColor='white'
                p='8'
                boxShadow='lg'
                transition='box-shadow 0.3s ease-in-out'
                _hover={{
                    boxShadow: 'xl',
                }}
            >
                <h1 style={{ fontSize: '2rem', color: 'teal.500', marginBottom: '4' }}>Update Sector</h1>
                    <CustomInputField placeholder="Name" inputValue={formData.userName} handleInputChange={handleNameChange} />
                    <CustomInputField placeholder="Sector" inputValue={formData.sectorName} handleInputChange={handleSectorChange} />
                    <CheckBox isChecked = {formData.termsAgreed} onChange={handleTermsChange} />
                    <CustomButton ButtonText = "Update" onClick={handleSubmit} />
            </VStack>
        </Box>
    );
};

export default UpdateForm;
