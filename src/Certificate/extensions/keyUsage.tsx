import { List, ListItem, ListItemText } from "@material-ui/core";
import { BaseExtension, DedicatedKeys, Item } from "../common";
import React from 'react';

export type KeyUsage = BaseExtension & {
    name: "keyUsage",
    digitalSignature: boolean,
    nonRepudiation: boolean,
    keyEncipherment: boolean,
    dataEncipherment: boolean,
    keyAgreement: boolean,
    keyCertSign: boolean,
    cRLSign: boolean,
    encipherOnly: boolean,
    decipherOnly: boolean
}

const names: DedicatedKeys<KeyUsage> =
    ["digitalSignature", "nonRepudiation", "keyEncipherment", "dataEncipherment",
        "keyAgreement", "keyCertSign", "cRLSign", "encipherOnly", "decipherOnly",];

export function KeyUsage({ data }: { data: KeyUsage }) {
    return (
        <Item data={data} title={data.name}>
            <List dense>
                {names.map(e => (<>
                    <KeyUsageValue name={e} value={data[e]} />
                </>))}
            </List>
        </Item>
    );
}

const KeyUsageValue = ({ name, value }: { name: string, value: boolean }) => {
    return (
        <ListItem>
            <ListItemText>
                <span style={{ fontWeight: 'bold' }}>{name}</span>: {value ? "true" : "false"}
            </ListItemText>
        </ListItem>
    )
}
