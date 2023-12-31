import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Tooltip } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { pki } from 'node-forge';
import JSONPretty from 'react-json-pretty';
import { sortBy } from '../../../../utils/utils';
import Extensions from './extensions';
import Exporter from './exporter';
import { CertificateElement } from '../Home';
import Spacer from '../../../common/Spacer/Spacer';


type Props = {
    certifcate: CertificateElement,
}

type Obj = Record<string, unknown>;

export function ShowRaw({ data }: Readonly<{ data: Obj | Obj[] }>) {
    const [show, setShow] = useState(false);

    return (
        <div>
            <Button onClick={() => setShow(e => !e)}>
                Show raw
            </Button>
            <Collapse in={show}>
                <JSONPretty data={data} />
            </Collapse>
        </div>
    )
}

function Issuer({ certificate: { issuer } }: Readonly<{ certificate: pki.Certificate }>) {

    const sorted = useMemo(() =>
        sortBy(issuer.attributes, e => e.shortName),
        [issuer.attributes]);

    return (
        <Card>
            <CardHeader title={`hash: ${issuer.hash}`} />
            <CardContent>
                {sorted.map(i => (
                    <Tooltip key={i.type} title={`type: ${i.type} | name: ${i.name}`}>
                        <div>
                            <span><b>{i.shortName ?? i.name}</b>: {i.value}</span>
                            <br />
                        </div>
                    </Tooltip>
                ))}
            </CardContent>
            <CardActions>
                <ShowRaw data={issuer} />
            </CardActions>
        </Card>
    )
}

function Subject({ certificate: { subject } }: Readonly<{ certificate: pki.Certificate }>) {

    const sorted = useMemo(() =>
        sortBy(subject.attributes, e => e.shortName),
        [subject.attributes]);

    return (
        <Card>
            <CardHeader title={`hash: ${subject.hash}`} />
            <CardContent>
                {sorted.map(i => (
                    <Tooltip key={i.type} title={`type: ${i.type} | name: ${i.name}`}>
                        <div>
                            <span><b>{i.shortName ?? i.name}</b>: {i.value}</span>
                            <br />
                        </div>
                    </Tooltip>
                ))}
            </CardContent>
            <CardActions>
                <ShowRaw data={subject} />
            </CardActions>
        </Card>
    )
}


export default function Certificate(props: Readonly<Props>) {
    const { certifcate } = props;
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                <h2>
                    Certificate
                </h2>
                <Exporter certificate={certifcate.certificate} />
            </div>
            <Spacer direction="vertical" size="1em" />
            <h3>
                Issuer
            </h3>
            <Issuer certificate={certifcate.certificate} />
            <Spacer direction="vertical" size="1em" />
            <h3>
                Subject
            </h3>
            <Subject certificate={certifcate.certificate} />
            <Spacer direction="vertical" size="1em" />

            <h3>
                Extensions
            </h3>
            <Extensions extensions={certifcate.certificate.extensions} />
            <h2>Other</h2>
        </>
    )
}


export function PrivateKey(props: Readonly<{ privateKey: pki.PrivateKey }>) {
    const { privateKey } = props;

    return (
        <>
            <h2>
                Private key
            </h2>
            {JSON.stringify(privateKey, null, 4)}
        </>
    )
}