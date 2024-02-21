import React from "react";
import { Input } from '@chakra-ui/react';

function CustomInputField(props) {
    return (
        <div style={{ textAlign: 'center', maxWidth: '400px', margin: 'auto',marginTop: '20px' }}>
            <Input
                value={props.inputValue}
                onChange={props.handleInputChange}
                placeholder={props.placeholder}
                size='lg'
                borderRadius='md'
                borderColor='teal.500'
            />
        </div>
    );
}

export default CustomInputField;
