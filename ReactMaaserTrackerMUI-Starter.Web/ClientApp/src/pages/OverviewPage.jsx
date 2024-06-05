import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import axios from 'axios';

const OverviewPage = () => {

    useEffect(() => {
        const getData = async () => {
            const { data } = await axios.get('/api/maasertracker/getoverviewdata');
            setData(data);
            setIsLoading(false);
        }
        getData();
    }, []);

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Container
            maxWidth="md"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80vh',
                textAlign: 'center'
            }}
        >
            <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px' }}>
                {isLoading ? <Typography variant="h4" gutterBottom>Loading...</Typography>
                    : <><Typography variant="h2" gutterBottom>
                        Overview
                    </Typography>
                        <Box sx={{ marginBottom: '20px' }}>
                            <Typography variant="h5" gutterBottom>
                                Total Income: ${data.totalIncome}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Total Maaser: ${data.totalMaaser}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography variant="h5" gutterBottom>
                                Maaser Obligated: ${data.maaserObligated}
                            </Typography>
                            <Typography variant="h5" gutterBottom>
                                Remaining Maaser Obligation: ${data.remainingMaaserObligation}
                            </Typography>
                        </Box></>}
            </Paper>
        </Container>
    );
}

export default OverviewPage;
