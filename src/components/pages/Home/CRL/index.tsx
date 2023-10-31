import React from 'react';
import Exporter from './exporter';
import { CrlElement } from '../Home';
import { Typography } from '@mui/material';

type Props = {
    crl: CrlElement
}

function Issuer({ crl: { crl } }: Props) {
    return (
        <>
            {JSON.stringify(crl.crl.issuer.toJSON())}
            {crl.crl.issuer.typesAndValues.map(v => {
                return (
                    <>
                        {v.toString()}: {v.value.getValue()}
                        <br />
                    </>
                )
            })}
        </>
    )
}

export default function CRL(props: Props) {
    const { crl } = props;
    return (
        <>
            <Typography>
                Format: {crl.format.toUpperCase()}
            </Typography>
            <Exporter crl={crl} />
            <Issuer crl={crl} />
            {/* {JSON.stringify(crl.issuer.toJSON())} */}
        </>
    )
}