/** @jsxImportSource @emotion/react */
import { FC, useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Card, Container, Footer, Gap, Header, SearchBar } from '../../components';
import { css } from '@emotion/react';
import { Button, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import LoadingButton from '@mui/lab/LoadingButton';
import ContactData from '../../components/molecules/ContactData';
import { AppContext } from '../../libs';
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './contact-list.scss'

interface Contact {
    __typename?: string;
    id: number;
    first_name: string;
    last_name: string;
    created_at: string;
    phones: { number: string }[];
}

// styling

const FavoriteStyle = css`
    .body{
        display: flex !important;
        align-items: center;
    }

    .action{
        margin-left:auto;
    }
`
const ButtonContactList = css`
    display: flex;
    a {
        margin-right: 4px;
        width: 64%;
    }
    .refresh-btn{
        width: 36%;
    }
`

const ContactList: FC = () => {

    const [dataFavorite, setDataFavorite] = useState<Contact[]>([])
    const [dataRegular, setDataRegular] = useState<Contact>()
    const elementRef = useRef<HTMLElement | null | any>(null);
    const [elementFavorite, setElementFavorite] = useState<any>(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const refetchQuery = queryParams.get('refetch');

    useEffect(() => {
        let favoriteData = sessionStorage.getItem('ContactFavorite');
        if (favoriteData) {
            const storageData = JSON.parse(favoriteData);
            setDataFavorite(storageData);
        }
    }, [])

    const handleDeleteFavorite = (_data: Contact | any) => {
        
        if (dataFavorite) {

            const updatedFavoriteData = dataFavorite.filter(item => item.id !== _data.id);

            sessionStorage.setItem('ContactFavorite', JSON.stringify(updatedFavoriteData));
            setDataFavorite(updatedFavoriteData);
            setDataRegular(_data);

            if (elementRef.current) {
                elementRef.current.classList.add('hidden');
            }
        }
    }

    const handleFavoriteData = (data: Contact[] | undefined | any) => {
        const dataSession = sessionStorage.getItem('ContactFavorite');
        if (dataSession) {
            const dataSessionJSON = JSON.parse(dataSession);
            dataSessionJSON.unshift(data);

            setDataFavorite(dataSessionJSON)
            sessionStorage.setItem('ContactFavorite', JSON.stringify(dataSessionJSON));
        } else {
            sessionStorage.setItem('ContactFavorite', JSON.stringify([data]))
            setDataFavorite([data]);
        }
    }

    return (
        <>
            <Header />
            <Container>
                <SearchBar />
                <Gap height={20} />
                <Card header='Contact Favorite' >
                    <div className='card-contact-favorite'>
                        <Gap height={10} />
                        {dataFavorite.map((item, i) => (
                            <div key={i} className={`card-favorite`} ref={elementRef}>
                                {item.id}
                                <Card customStyles={FavoriteStyle}>
                                    <div className='desc'>
                                        <b>{item.first_name} {item.last_name}</b> <br />
                                        {item.phones.map((phone, index) => (
                                            <span key={index}> {phone.number}</span>
                                        ))}
                                    </div>
                                    <div className='action'>
                                        <IconButton aria-label="favorite" color="success" onClick={() => handleDeleteFavorite(item as any)}>
                                            <FavoriteIcon />
                                        </IconButton>
                                        <IconButton aria-label="favorite" color="success">
                                            <Delete />
                                        </IconButton>
                                        <IconButton aria-label="favorite" color="success">
                                            <Edit />
                                        </IconButton>
                                    </div>
                                </Card>
                                <Gap height={8} />
                            </div>
                        ))}
                    </div>
                </Card>
                <Gap height={20} />
                <Card header='Contact List'>
                    <ContactData dataFavorite={handleFavoriteData} dataRegular={dataRegular} />
                </Card>
            </Container>
            <Footer />
        </>
    )
}

export default ContactList
