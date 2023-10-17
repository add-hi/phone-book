import React, {FC} from 'react'
import styled from '@emotion/styled';

interface ButtonProp {
    name?: string;  
    variant? : string;
}

const ButtonStyle = styled.div`
    text-align: center;
    padding: .5rem;
    background: black;
    color: white;
    border-radius: .5rem;
`

const Button : FC<ButtonProp> = ({ name , variant}) => {
    return (
        <ButtonStyle className={variant}>
            {name}
        </ButtonStyle>
    )
}

export default Button