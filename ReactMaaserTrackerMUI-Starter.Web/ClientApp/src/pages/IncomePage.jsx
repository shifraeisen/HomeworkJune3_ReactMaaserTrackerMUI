import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Container, FormControlLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Image from 'mui-image';
import axios from 'axios';
import dayjs from 'dayjs';


const IncomePage = () => {

    useEffect(() => {
        const getIncomes = async () => {
            const { data } = await axios.get('/api/maasertracker/getincomes');
            setIncomes(data);
            setIsLoading(false);
        }
        getIncomes();
    }, []);

    const [groupBySource, setGroupBySource] = useState(false);
    const [incomes, setIncomes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getGroups = () => {
        const groups = [];
        new Set(incomes.map(i => i.source.name)).forEach(s => groups.push({ source: s, incomes: incomes.filter(i => i.source.name === s) }));
        return groups;
    };

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
                Income History
            </Typography>

            <FormControlLabel
                control={
                    <Checkbox
                        checked={groupBySource}
                        onChange={(event) => setGroupBySource(event.target.checked)}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Group by source"
            />

            {!groupBySource ? (
                <TableContainer component={Paper} sx={{ maxWidth: '80%', width: '80%' }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomes.map((income) => (
                                <TableRow key={income.id}>
                                    <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                        {income.source.name}
                                    </TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                                    <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format('M/D/YYYY')}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            ) : (
                getGroups().map(g => (
                    <div key={g.source} sx={{ width: '80%', maxWidth: '80%' }}>
                        <Typography variant="h5" gutterBottom component="div" sx={{ mt: 5 }}>
                            {g.source}
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Amount</TableCell>
                                        <TableCell align="right" sx={{ fontSize: '18px' }}>Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {g.incomes.map((income) => (
                                        <TableRow key={income.id}>
                                            <TableCell component="th" scope="row" sx={{ fontSize: '18px' }}>
                                                {income.source.name}
                                            </TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>${income.amount}</TableCell>
                                            <TableCell align="right" sx={{ fontSize: '18px' }}>{dayjs(income.date).format('M/D/YYYY')}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                ))
            )}
        </Container>
    );
}

export default IncomePage;
