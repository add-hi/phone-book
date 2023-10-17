import React, { FC } from 'react'
import styled from '@emotion/styled';

interface HeaderProps {

}

const HeaderStyle = styled.div`
    text-align: center;
    padding: 20px;
    background: black;
    color: white;
    font-weight: bold;
`
const Header: FC<HeaderProps> = () => {
    return (
        <HeaderStyle>
            Contact Apps
        </HeaderStyle>
    )
}

export default Header
