import React from "react";
import { Button } from '@chakra-ui/react';

function AddSectorButton(props) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button colorScheme='teal' onClick={props.onClick} size='md'>
                {props.ButtonText}
            </Button>
        </div>
    );
}

export default AddSectorButton;
