import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled';
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

interface FooterProps {

}

const FooterStyle = styled.div`
    text-align: center;
    padding: .5rem;
    background: black;
    color: white;
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1030;

    .row{
        display: flex;
        flex-wrap: wrap;
    }
    .col{
        width : 50%
    }

    a{
        text-decoration: none;
        color: #fff;
    }

    svg{
        display: block;
        text-align: center;
        width: 100%;
        font-size: 18px;
    }
`
const Footer: FC<FooterProps> = () => {
    return (
        <FooterStyle>
            <div className='row'>
                <div className="col">
                    <Link to={'/'}>
                        <HomeIcon />
                        Home
                    </Link>
                </div>
                <div className="col">
                    <Link to={'/Form'}>
                        <PersonAddIcon/>
                        Form
                    </Link>
                </div>
            </div>
        </FooterStyle>
    )
}

export default Footer
