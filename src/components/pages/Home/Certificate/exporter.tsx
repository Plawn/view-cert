import { Button } from '@mui/material';
import React from 'react';
import forge, { pki } from 'node-forge';
import { contentToDisk} from '../../../../utils/downloadUtils';

function getPem(cert: pki.Certificate) {
    const pem = pki.certificateToPem(cert);
    contentToDisk(pem, "certificate.pem");
}

function getDer(cert: pki.Certificate) {
    const der = pki.certificateToAsn1(cert);
    const a = forge.asn1.toDer(der)
    contentToDisk(forge.util.binary.raw.decode(a.getBytes()), "certificate.der");
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