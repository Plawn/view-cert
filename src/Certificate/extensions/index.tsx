import { Typography } from "@material-ui/core";
import { ShowRaw } from "..";
import { BaseExtension, ByteArray, Item } from "../common";
import type { KeyUsage as KeyUsageType } from "./keyUsage";
import { KeyUsage } from "./keyUsage";
import React from 'react';
import BasicConstraints from "./basicConstraints";
import type { BasicConstraints as BasicConstraintsType } from "./basicConstraints";
import type { CertificatePolicies as CertificatePoliciesType } from './certificatePolicies';
import CertificatePolicies from "./certificatePolicies";

type AuthorityKeyIdentifier = BaseExtension & {
    name: "authorityKeyIdentifier",
}

type SubjectKeyIdentifier = BaseExtension & {
    name: "subjectKeyIdentifier",
    subjectKeyIdentifier: string,
}

type Name = {
    type: number,
    value: string;
    ip: string;
}

type SubjectAltNames = BaseExtension & {
    name: "subjectAltName",
    altNames: Name[],
}

type Extension =
    KeyUsageType |
    AuthorityKeyIdentifier |
    SubjectKeyIdentifier |
    BasicConstraintsType |
    CertificatePoliciesType |
    SubjectAltNames
    ;

function AuthorityKeyIdentifier({ data }: { data: AuthorityKeyIdentifier }) {
    return (
        <Item title="AuthorityKeyIdentifier" data={data}>
            value: <ByteArray value={data.value} />
        </Item>
    );
}

function SubjectKeyIdentifier({ data }: { data: SubjectKeyIdentifier }) {
    return (
        <Item title="SubjectKeyIdentifier" data={data}>
            <Typography>
                value: <ByteArray value={data.value} />
            </Typography>
            <Typography>
                subjectKeyIdentifier: {data.subjectKeyIdentifier}
            </Typography>
        </Item>
    );
}

function SubjectAltNames({ data }: { data: SubjectAltNames }) {
    return (
        <Item title="SubjectAltNames" data={data}>
            <Typography>
                value: <ByteArray value={data.value} />
            </Typography>
            <Typography>
                SubjectAltNames: {JSON.stringify(data.altNames)}
            </Typography>
        </Item>
    );
}

export default function Extensions({ extensions }: { extensions: Extension[] }) {

    return (
        <div>
            {extensions.map(e => {
                if (e.name === "keyUsage") {
                    return <KeyUsage data={e} />
                }
                if (e.name === "authorityKeyIdentifier") {
                    return <AuthorityKeyIdentifier data={e} />
                }
                if (e.name === "subjectKeyIdentifier") {
                    return <SubjectKeyIdentifier data={e} />
                }
                if (e.name === "basicConstraints") {
                    return <BasicConstraints data={e} />
                }
                if (e.name === "certificatePolicies") {
                    return <CertificatePolicies data={e} />
                }
                if (e.name === "subjectAltName") {
                    return <SubjectAltNames data={e} />
                }
            })}
            <hr />
            <ShowRaw data={extensions} />
        </div>
    )
}