import React, { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

function TransferComponent() {
    const [institutions, setInstitutions] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [identificationType, setIdentificationType] = useState('C');
    const [identification, setIdentification] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [transferValue, setTransferValue] = useState('');

    const servicioInstitucionAPI = 'https://desarrollo.gti.fin.ec/boton-web-api-ws-1.0/coopagos/web/public/institution'

    useEffect(() => {
        // Fetch the institutions from the API when the component mounts
        fetch(servicioInstitucionAPI)  // Replace with the actual API endpoint
            .then(response => response.json())
            .then(data => setInstitutions(data));
    }, []);

    const handleSubmit = () => {
        const requestData = {
            institution: selectedInstitution,
            debitPerson: {
                identificationType,
                identification,
                accountType: 1,
                accountNumber
            },
            creditPerson: {
                institution: "2",
                identificationType: "C",
                identification: "0102514106",
                accountType: 1,
                account: "100004"
            },
            value: transferValue
        };

        fetch('/api/transfer', {  // Replace with the actual API endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
                <InputLabel>Institución</InputLabel>
                <Select
                    value={selectedInstitution}
                    onChange={e => setSelectedInstitution(e.target.value)}
                    label="Institución"
                >
                    {institutions.map(inst => (
                        <MenuItem key={inst.id} value={inst.id}>{inst.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
                <InputLabel>Tipo de identificación</InputLabel>
                <Select
                    value={identificationType}
                    onChange={e => setIdentificationType(e.target.value)}
                    label="Tipo de identificación"
                >
                    <MenuItem value="C">Cedula</MenuItem>
                    <MenuItem value="R">RUC</MenuItem>
                </Select>
            </FormControl>
            <TextField
                fullWidth
                variant="outlined"
                label="Identificación"
                value={identification}
                onChange={e => setIdentification(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Número de cuenta"
                value={accountNumber}
                onChange={e => setAccountNumber(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <TextField
                fullWidth
                variant="outlined"
                label="Valor de la transferencia"
                value={transferValue}
                onChange={e => setTransferValue(e.target.value)}
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
            </Button>
        </div>
    );
}

export default TransferComponent;
