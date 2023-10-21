import React, { FC, useEffect, useState } from 'react'
import { Card, Container, Footer, Gap, Header, Input } from '../../components'
import styled from '@emotion/styled';
import { gql, useMutation } from '@apollo/client';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert } from '@mui/lab';
import { Snackbar } from '@mui/base/Snackbar/Snackbar';
import './form-contact.scss'

interface FormContactProps {

}

type DataState = {
    __typename: string;
    created_at: string;
    first_name: string;
    id: number;
    last_name: string;
    phones: Array<{
        __typename: string;
        number: string;
    }>;
};


const ADD_CONTACT = gql`
  mutation AddContactWithPhones(
    $first_name: String!, 
    $last_name: String!, 
    $phones: [phone_insert_input!]!
  ) {
    insert_contact(
      objects: {
        first_name: $first_name, 
        last_name: $last_name, 
        phones: {
          data: $phones
        }
      }
    ) {
      returning {
        first_name
        last_name
        id
        phones {
          number
        }
      }
    }
  }
`;

const EDIT_CONTACT = gql`
mutation EditContactById($id: Int!, $_set: contact_set_input) {
  update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
    id
    first_name
    last_name
    phones {
      number
    }
  }
}
`;

const FormContact: FC<FormContactProps> = () => {
    const [contactData, setContactData] = useState({first_name: '',last_name: '',phones: [{number: ''}],});
    const [addContact] = useMutation(ADD_CONTACT);
    const [editContact] = useMutation(EDIT_CONTACT);
    const [message, setMessage] = useState('')
    const [open, setOpen] = React.useState(false);
    const [hiddenNumber, setHiddenNumber] = useState(false);
    const [dataState, setDataState] = useState<DataState | null>(null)
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        if (location.state) {
            let data = location.state;
            setContactData({
                ...contactData,
                first_name: data.first_name,
                last_name: data.last_name
            });
            setDataState(data);
            setHiddenNumber(true);
        }
    }, [])

    const handleAddEditContact = () => {
        if (dataState) {
            const dataSend: Partial<DataState> = {
                first_name: contactData.first_name,
                last_name: contactData.last_name,
            }
            editContact({
                variables: {
                    id: dataState.id,
                    _set: dataSend,
                }
            }).then((result) => {
                navigate('/', { state: { refetch: true } });
            }).catch((error) => {
                setOpen(true);
                setMessage("Error editing contact")
            });
        } else {
            addContact({
                variables: contactData
            }).then((result) => {
                navigate('/', { state: { refetch: true } });
            }).catch((error) => {
                setOpen(true);
                setMessage("Error adding contact")
            });
        }
    };

    const handleClose = (event: React.SyntheticEvent | Event | null, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <Header />
            <Container>
                <Card header='Form Contact'>
                    <TextField
                        id="firstName"
                        label="First name"
                        margin="normal"
                        value={contactData.first_name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setContactData({ ...contactData, first_name: event.target.value })
                        }}
                        helperText="Please enter your first name"
                        fullWidth
                    />
                    <TextField
                        id="lastName"
                        label="Last Name"
                        margin="normal"
                        value={contactData.last_name}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setContactData({ ...contactData, last_name: event.target.value })
                        }}
                        helperText="Please enter your last name"
                        fullWidth
                    />
                    {!hiddenNumber ?
                        <TextField
                            id="phoneNumber"
                            label="Phone number"
                            margin="normal"
                            value={contactData.phones[0].number}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                const updatedPhones = [...contactData.phones];
                                updatedPhones[0].number = event.target.value;
                                setContactData({ ...contactData, phones: updatedPhones });
                            }}
                            helperText="Please enter your phone number"
                            fullWidth
                            type="number"
                        /> : <></>
                    }

                    <Button variant="contained" endIcon={<SendIcon />} onClick={handleAddEditContact}>Submit Data</Button>
                </Card>
            </Container>
            <Snackbar open={open} autoHideDuration={9999000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '50%' }}>
                    {message}
                </Alert>
            </Snackbar>
            <Footer />
        </>
    )
}

export default FormContact