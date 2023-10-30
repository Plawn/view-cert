import { BaseExtension, DedicatedKeys, Item, Value } from "../common";
import React from 'react';

export type BasicConstraints = BaseExtension & {
    name: "basicConstraints",
    cA: boolean,
    pathLenConstraint: number,
}

export default function BasicConstraints({ data }: { data: BasicConstraints }) {
    const names: DedicatedKeys<BasicConstraints> = ["cA", "pathLenConstraint"];
    return (
        <Item title="Basic Constraints" data={data}>
            {names.map(e => 
                <>
                    <b>{e}</b>: <Value value={data[e]} />
                    <br />
                </>
            )}
        </Item>
    )
}