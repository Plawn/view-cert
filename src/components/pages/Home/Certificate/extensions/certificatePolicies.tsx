
import { BaseExtension, ByteArray, Item } from "../common";
import React from 'react';



export type CertificatePolicies = BaseExtension & {
    name: "certificatePolicies",
}

export default function CertificatePolicies({ data }: { data: CertificatePolicies }) {
    return (
        <Item title="CertificatePolicies" data={data}>
            value: <ByteArray value={data.value} />
        </Item>
    );
}