import React, { FC, useState, ChangeEvent, useEffect, useContext } from 'react'
import { Card, Gap } from '../../../components';
import { css } from '@emotion/react';
import { Accordion, AccordionDetails, AccordionSummary, Badge, Box, Pagination, Skeleton, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Avatar from '@mui/material/Avatar';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { AppContext } from '../../../libs';
import './content-data.scss'
import { Link, useNavigate } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import LoadingButton from '@mui/lab/LoadingButton';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';


interface Contact {
    __typename?: string;
    id: number | any;
    first_name: string;
    last_name: string;
    created_at: string;
    phones: { number: string }[];
}

interface Props {
    dataFavorite: (data: Contact[] | undefined) => void;
    dataRegular?: Contact[] | any;
}


const ContactListStyle = css`
.body{
    font-size: 14px;
    display: flex;
    align-items: center;
    padding: 0;
}
`

const AvatarStyle = css`
    margin-top: 4px;
    margin-right: 8px;
`

function stringToColor(string: string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

function stringAvatar(name: string) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}

const GET_CONTACT_LIST = gql`
query GetContactList {
    contact {
      created_at
      first_name
      id
      last_name
      phones {
        number
      }
    }
  }
`;
const ContactData: FC<Props> = ({ dataFavorite, dataRegular }) => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [perPage, setPerPage] = useState<number>(5);
    const [dataContact, setDataContact] = useState<Contact[]>([])
    const [hiddenElements, setHiddenElements] = useState<Contact[]>([]);
    const [loadQuery, { data, loading, refetch }] = useLazyQuery<{ contact: Contact[] }>(GET_CONTACT_LIST);
    const [pageCount, setPageCount] = useState<number>(0);
    const [displayedData, setDisplayedData] = useState<Contact[]>([])

    const navigate = useNavigate();
    let updateData: Contact[] = [];
    //const listContactFavorite = useContext(AppContext);
    useEffect(() => {
        const storedData = sessionStorage.getItem('ContactList');
        if (storedData) {
            setDataContact(JSON.parse(storedData));
        } else {
            loadQuery();
        }
    }, []);

    useEffect(() => {
        if (data?.contact) {            
            setDataContact(data.contact);
            sessionStorage.setItem('ContactList', JSON.stringify(data.contact))
        }
    }, [data]);

    useEffect(() => {
        if (dataRegular != undefined) {
            setDataContact([dataRegular, ...dataContact]);
            sessionStorage.setItem('ContactList', JSON.stringify(dataContact))
        }
    }, [dataRegular])

    useEffect(() => {
        if (dataContact) {
            pagination();
        }
    }, [dataContact])

    useEffect(()=>{
        pagination();
    },[currentPage])

    const handleRefetch = () => {
        refetch();
    };

    const handleFavorite = (data: any) => {
        let dataTemp: any[] = [];

        if (dataContact) {
            dataTemp = dataContact.filter(item => item.id !== data.id);
            sessionStorage.setItem('ContactList', JSON.stringify(dataTemp));
            setDataContact(dataTemp);
            dataFavorite(data);
        }
    }

    const handleEditData = (_data: Contact) => {
        const dataToSend = { _data };
        //navigate(`/Form?data=${JSON.stringify(dataToSend)}`);
    }

    if (loading) return (
        <>
            <Skeleton variant="rounded" height={72} />
            <Gap height={8} />
            <Skeleton variant="rounded" height={72} />
            <Gap height={8} />
            <Skeleton variant="rounded" height={72} />
            <Gap height={8} />
            <Skeleton variant="rounded" height={72} />
            <Gap height={8} />
        </>
    );

    if (!dataContact) return <p>Data Empty</p>

    const pagination = () => {
        let dataList = dataContact;

        let pageCount = Math.ceil(dataList.length / perPage);
        let startIndex = (currentPage - 1) * perPage;
        let endIndex = startIndex + perPage;
        let displayedData = dataList.slice(startIndex, endIndex);

        setPageCount(pageCount);
        setDisplayedData(displayedData);
    }

    const handleChange = (e: ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };


    return (
        <>
            <div className='button-contact-list'>
                <Link to={'/Form'}>
                    <Button variant="contained" endIcon={<AddBoxIcon />} sx={{ width: '100%', background: 'black' }}>
                        Add Contact
                    </Button>
                </Link>

                <LoadingButton
                    size="small"
                    endIcon={<RefreshRoundedIcon />}
                    loading={false}
                    variant="contained"
                    loadingPosition="center"
                    className="refresh-btn"
                    onClick={() => handleRefetch()}
                >
                    <span>Refresh</span>
                </LoadingButton>
            </div>
            <Gap height={10} />
            {displayedData.map((item, i) => (
                <div className={`card-accordion`} key={i}>
                    <Card customStyles={ContactListStyle}>
                        <Accordion className='accordion'>
                            <AccordionSummary
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <>
                                    <Badge
                                        badgeContent={item.phones.length > 1 ? item.phones.length : null}
                                        color="info"
                                    >
                                        <Avatar sx={{ ...AvatarStyle, ...stringAvatar(`${item.first_name} ${item.last_name}`).sx }} />
                                    </Badge>
                                    <Typography><b>{item.first_name} {item.last_name}</b> <br />{item.phones[0]?.number}</Typography>
                                </>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography className='description'>
                                    {item.phones.map((phone, index) => (
                                        <span key={index}><ContactPageIcon /> {phone.number} <br /></span>
                                    ))}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}>
                                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                                        <IconButton aria-label="delete" color="error">
                                            <DeleteIcon />
                                        </IconButton>
                                        <Link to={'/Form'} state={item}>
                                            <IconButton aria-label="Edit" color="primary">
                                                <EditIcon />
                                            </IconButton>
                                        </Link>
                                        <IconButton aria-label="favorite" color="success" onClick={() => handleFavorite(item)}>
                                            <FavoriteIcon />
                                        </IconButton>
                                    </ButtonGroup>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                    <Gap height={8} />
                </div>
            ))}
            <Box display="flex" justifyContent="center" >
                <Pagination count={pageCount} page={currentPage} onChange={handleChange} />
            </Box >
        </>
    )

}

export default ContactData;