import React, { useState, FC, ChangeEvent } from 'react';
import { Button, Card, Gap } from '../../atoms';
import { css } from '@emotion/react';
import ContactsIcon from '@mui/icons-material/Contacts';
import DialpadIcon from '@mui/icons-material/Dialpad';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

interface InputProps {
    placeholder?: string;
    type: string;
    onInputChange?: (value: string) => void;
    value?: string; 
}

const InputStyle = css`
    .body{
        padding: 8px;
        display: flex;
    }
    svg{
        margin-right: 10px;
    }
    input{
        width: 100%;
        border: none;
        font-size: 14px;
        outline: none;
    }
`;

const Input: FC<InputProps> = ({ placeholder, type, onInputChange }) => {

    const [showIcon, setShowIcon] = useState<boolean | null>(false);

    const handleAddPhone = () => {
        if (onInputChange) {
            onInputChange('');
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        if (inputValue.length > 0) {
            setShowIcon(true);
        } else {
            setShowIcon(false);
        }

        if (onInputChange) {
            onInputChange(inputValue);
        }

    }

    return (
        <Card customStyles={InputStyle}>
            {type === 'text' ? <ContactsIcon /> : <DialpadIcon />}
            <input
                type={type}
                placeholder={placeholder}
                aria-label={placeholder}
                aria-describedby="basic-addon2"
                onChange={handleChange}
                pattern={type === 'number' ? "[0-9]*" : undefined}
            />
            {showIcon ? (type === 'text' ? <></> : <AddCircleOutlineIcon onClick={handleAddPhone} />) : <></>}
        </Card>
    );
}

export default Input;
