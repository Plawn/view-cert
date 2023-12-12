import { Typography } from "@mui/material";
import { ShowRaw } from "..";
import { BaseExtension, ByteArray, Item } from "../common";
import type { KeyUsage as KeyUsageType } from "./keyUsage";
import { KeyUsage } from "./keyUsage";
import React from 'react';
import BasicConstraints from "./basicConstraints";
import type { BasicConstraints as BasicConstraintsType } from "./basicConstraints";
import type { CertificatePolicies as CertificatePoliciesType } from './certificatePolicies';
import CertificatePolicies from "./certificatePolicies";
import Spacer from "../../../../common/Spacer/Spacer";

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

function AuthorityKeyIdentifier({ data }: Readonly<{ data: AuthorityKeyIdentifier }>) {
    return (
        <Item title="AuthorityKeyIdentifier" data={data}>
            value: <ByteArray value={data.value} />
        </Item>
    );
}

function SubjectKeyIdentifier({ data }: Readonly<{ data: SubjectKeyIdentifier }>) {
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

function SubjectAltNames({ data }: Readonly<{ data: SubjectAltNames }>) {
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

export default function Extensions({ extensions }: Readonly<{ extensions: Extension[] }>) {

    return (
        <div>
            {extensions.map(e => {
                let res: JSX.Element;
                if (e.name === "keyUsage") {
                    res = <KeyUsage data={e} />
                }
                if (e.name === "authorityKeyIdentifier") {
                    res = <AuthorityKeyIdentifier data={e} />
                }
                if (e.name === "subjectKeyIdentifier") {
                    res = <SubjectKeyIdentifier data={e} />
                }
                if (e.name === "basicConstraints") {
                    res = <BasicConstraints data={e} />
                }
                if (e.name === "certificatePolicies") {
                    res = <CertificatePolicies data={e} />
                }
                if (e.name === "subjectAltName") {
                    res = <SubjectAltNames data={e} />
                }
                return (
                    <React.Fragment key={e.id}>
                        {/* @ts-ignore */}
                        {res}
                        <Spacer size="1em" direction="vertical" />
                    </React.Fragment>
                )
            })}
            <hr />
            <ShowRaw data={extensions} />
        </div>
    )
}