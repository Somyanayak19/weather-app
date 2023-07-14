import React from 'react';
import { IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const SearchIconButton = () => {
    return <IconButton type="submit" sx={{ p: '10px', mt: '12px' }} color="primary" aria-label="search">
    <SearchIcon sx={{ fontSize: '32px' }} />
</IconButton>;
} 

export default SearchIconButton;