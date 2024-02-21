import React from "react";
import { Checkbox, Text } from '@chakra-ui/react';

function CheckBox(props) {
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Checkbox
                isChecked={props.isChecked}
                onChange={props.handleCheckBox}
                colorScheme='teal'
            >
                <Text fontSize='md' fontWeight='bold'>
                    I Agree To Terms And Conditions
                </Text>
            </Checkbox>
        </div>
    );
}

export default CheckBox;
