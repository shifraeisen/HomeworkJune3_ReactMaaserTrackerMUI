import React, { useEffect, useState } from 'react';
import { Box, Container, TextField, Button, Autocomplete, Typography } from '@mui/material';
import Image from 'mui-image';
import dayjs from 'dayjs';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddIncomePage = () => {

    useEffect(() => {
        const getSources = async () => {
            const { data } = await axios.get('/api/maasertracker/getsources');
            setSources(data);
        }
        getSources();
    }, []);

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [sources, setSources] = useState([]);
    const [selectedSource, setSelectedSource] = useState();
    const [amount, setAmount] = useState();

    const addIncome = async () => {
        await axios.post('/api/maasertracker/addincome', { sourceId: selectedSource.id, amount, date: selectedDate });
        navigate('/income');
    }

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '80vh' }}>
            <Typography variant="h2" component="h1" gutterBottom>
                Add Income
            </Typography>
            <Autocomplete
                value={selectedSource}
                onChange={(e, source) => setSelectedSource(source)}
                options={sources}
                getOptionLabel={(option) => option.name}
                fullWidth
                margin="normal"
                renderInput={(params) => <TextField {...params} label="Source" variant="outlined" />}
            />
            <TextField
                label="Amount"
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 0.01 } }}
                fullWidth
                margin="normal"
                value={amount}
                onChange={e => setAmount(e.target.value)}
            />
            <TextField
                label="Date"
                type="date"
                value={dayjs(selectedDate).format('YYYY-MM-DD')}
                onChange={e => setSelectedDate(e.target.value)}
                //renderInput={(params) => <TextField {...params} fullWidth margin="normal" variant="outlined" />}
            />
            <Button onClick={addIncome} variant="contained" color="primary">Add Income</Button>
        </Container>
    );
}

export default AddIncomePage;
