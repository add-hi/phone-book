import React, { ReactNode, FC } from 'react'
import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';


interface Props {
    header?: string;
    children?: ReactNode;
    customStyles?: SerializedStyles;
}

const CardStyle = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    border-radius: .5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

    .body{
        padding: 8px
    }

    .header{
        background: black;
        border-radius: .5rem .5rem 0 0;
        text-align: center;
        color: #fff;
        padding: 4px 0 4px 0;
    }
`

const CustomCard = styled(CardStyle)`
    ${(props: { customStyles?: SerializedStyles }) => props.customStyles}
`;

const Card: FC<Props> = ({customStyles, header, children}) => {
    return (
        <>
            <CustomCard customStyles={customStyles}>
                {header ? <div className='header'>
                    {header}
                </div> : <></>}
                <div className='body'>
                    {children}
                </div>
            </CustomCard>
        </>
    );
};

export default Card