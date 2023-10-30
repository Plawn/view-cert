import { Button } from '@mui/material';
import React from 'react';
import forge, { pki } from 'node-forge';
import { downloadContent } from '../../../../utils/utils';

function getPem(cert: pki.Certificate) {
    const pem = pki.certificateToPem(cert);
    downloadContent(pem, "certificate.pem");
}

function getDer(cert: pki.Certificate) {
    const der = pki.certificateToAsn1(cert);
    const a = forge.asn1.toDer(der)
    downloadContent(forge.util.binary.raw.decode(a.getBytes()), "certificate.der");
}

export default function Exporter(props: { certificate: pki.Certificate }) {
    const { certificate } = props;

    return (
        <div>
            <Button onClick={() => getPem(certificate)}>
                Get PEM
            </Button>
            <Button onClick={() => getDer(certificate)}>
                Get DER
            </Button>
        </div>
    )
}