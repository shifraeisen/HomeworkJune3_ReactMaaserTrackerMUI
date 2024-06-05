import React from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddMaaserPage = () => {

    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [recipient, setRecipient] = useState('');
    const [amount, setAmount] = useState();

    const navigate = useNavigate();

    const addMaaser = async () => {
        await axios.post('/api/maasertracker/addmaaser', { recipient, amount, date: selectedDate });
        navigate('/maaser');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Maaser
            </Typography>
            <TextField value={recipient} onChange={e => setRecipient(e.target.value)} label="Recipient" variant="outlined" fullWidth margin="normal" />
            <TextField value={amount} onChange={e => setAmount(e.target.value)} label="Amount" variant="outlined" fullWidth margin="normal" />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={addMaaser} variant="contained" color="primary">Add Maaser</Button>
        </Container>
    );
}

export default AddMaaserPage;
