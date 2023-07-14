import React from 'react';
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import SearchIconButton from './SearchIconButton';

interface MyComponentProps {
    error: boolean,
    changeInput:(data:any) => void,
    params: string[];
  }

const SearchBox = ({ error, changeInput, params } :MyComponentProps) => {
    const onInputChange = (e:any) => {
        changeInput(e.target.value);
    }

    return (
        <>
            <TextField error={error}
                helperText={error ? 'Please enter any City Name' : ''}
                onChange={(e) => { onInputChange(e) }}
                {...params} label="Search City" sx={{ borderRadius: '100px', marginTop: '10px', width: '50%' }} />
            <SearchIconButton />
        </>
    );
};

export default SearchBox;