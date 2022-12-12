/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import EngineeringIcon from '@mui/icons-material/Engineering';
import SendIcon from '@mui/icons-material/Send';

const ApplicationNavbar = ({ changeTab }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        changeTab(newValue);
        setValue(newValue);
    };

    return (
        <Tabs value={value} variant="fullWidth" style={{ width: '100%' }} onChange={(event, newValue) => handleChange(event, newValue)} aria-label="icon label tabs example">
            <Tab fullWidth icon={<EngineeringIcon />} style={{ color: '#3758f9', width: '100%' }} label="Project Details" />
            <Tab fullWidth icon={<SendIcon />} style={{ color: '#3758f9', width: '100%' }} label="Application Details" />
        </Tabs>
    );
}

export default ApplicationNavbar;