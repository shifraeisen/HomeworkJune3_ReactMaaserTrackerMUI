import { Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box } from '@mui/material';
import Image from 'mui-image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageSourcesPage = () => {

    useEffect(() => {
        refreshSources();
    }, []);

    const [sources, setSources] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedSource, setSelectedSource] = useState('');
    const [editingSource, setEditingSource] = useState(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteId, setDeleteID] = useState(0);

    const refreshSources = async () => {
        const { data } = await axios.get('/api/maasertracker/getsources');
        setSources(data);
        setIsLoading(false);
    }

    const handleOpen = (source = {}) => {
        setOpen(true);
        setSelectedSource(source.name);
        setEditingSource(source);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedSource('');
        setEditingSource(null);
    };

    const handleAddEdit = async () => {
        if (editingSource) {
            await axios.post('/api/maasertracker/updatesource', { name: selectedSource, id: editingSource.id });
            refreshSources();
        } else {
            await axios.post('/api/maasertracker/addsource', { name: selectedSource });
            refreshSources();
        }
        handleClose();
    };

    const handleDelete = async (id) => {
        setDeleteID(id);
        setConfirmOpen(true);
    };

    const handleConfirmClose = () => {
        setDeleteID(0);
        setConfirmOpen(false);
    };
    const deleteSource = async () => {
        await axios.post('/api/maasertracker/deletesource', { id: deleteId });
        handleConfirmClose();
        refreshSources();
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '120px 0' }}>
                <Image sx={{ maxWidth: '400px' }} src='/src/loadingimage/Infinity@1x-1.0s-200px-200px.gif' height='10%' />
            </Box>
        )
    }

    return (
        <Container>
            <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Button onClick={() => handleOpen()} variant="contained" color="primary" sx={{ minWidth: '200px' }}>
                    Add Source
                </Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontSize: '18px' }}>Source</TableCell>
                            <TableCell align="right" sx={{ fontSize: '18px' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sources.map((source) => (
                            <TableRow key={source.id}>
                                <TableCell sx={{ fontSize: '18px' }}>{source.name}</TableCell>
                                <TableCell align="right" sx={{ fontSize: '18px' }}>
                                    <Button color="primary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleOpen(source)}>Edit</Button>
                                    <Button color="secondary" variant="outlined" sx={{ margin: '0 5px' }} onClick={() => handleDelete(source.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>{editingSource ? 'Edit Source' : 'Add Source'}</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" label="Source" type="text" fullWidth value={selectedSource} onChange={(e) => setSelectedSource(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddEdit} color="primary">
                        {editingSource ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmOpen} onClose={handleConfirmClose} fullWidth maxWidth="sm">
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    This source has some income associated with it, are you sure you want to delete it?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={deleteSource} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default ManageSourcesPage;
