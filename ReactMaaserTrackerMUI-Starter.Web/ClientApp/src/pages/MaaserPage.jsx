import React, { useEffect, useState } from 'react';
import { Box, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import axios from 'axios';
import Image from 'mui-image';
import dayjs from 'dayjs';

const MaaserPage = () => {

    useEffect(() => {
        const getMaaser = async () => {
            const { data } = await axios.get('/api/maasertracker/getmaaser');
            setMaaser(data);
            setIsLoading(false);
        }
        getMaaser();
    }, []);

    const [maaser, setMaaser] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '120px 0' }}>
                <Image sx={{ maxWidth: '400px' }} src='/src/loadingimage/Infinity@1x-1.0s-200px-200px.gif' height='10%' />
            </Box>
        )
    }

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
            <Typography variant="h2" gutterBottom component="div">
                Maaser Payments History
            </Typography>
            <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Recipient</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {maaser.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                    {payment.recipient}
                                </TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>${payment.amount}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(payment.date).format('M/D/YYYY')}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}

export default MaaserPage;
