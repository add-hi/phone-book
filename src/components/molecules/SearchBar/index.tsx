import React, { FC } from 'react'
import { Card } from '../../atoms';
import { css } from '@emotion/react';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

interface SearchbarProps {
}

const SearchStyle = css`
    .body{
        padding: 8px;
        display: flex;
    }
    i{
        margin-right: 10px;
    }
    input{
        width: 100%;
        border: none;
        font-size: 14px;
        outline: none;
    }
`;

const SearchBar: FC<SearchbarProps> = () => {
    return (

        <Card customStyles={SearchStyle}>
            <ManageSearchIcon />
            <input
                type="text"
                placeholder="Search Number"
                aria-label="Search Number"
                aria-describedby="basic-addon2"
            />
        </Card>
    )
}
export default SearchBar