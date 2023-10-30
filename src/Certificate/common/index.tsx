import { Card, CardContent, CardHeader, Tooltip } from "@material-ui/core";
import { util } from 'node-forge';
import React from "react";

export type BaseExtension = {
    id: string;
    critical: boolean;
    value: string;
}

function BooleanValue({ value }: { value: boolean }) {
    return (
        <>
            {value ? "true" : "false"}
        </>
    );
}

function NumberValue({ value }: { value: number }) {
    return (
        <>
            {`${value}`}
        </>
    );
}

function UndefinedValue() {
    return <>undefined</>;
}

export function Value({ value }: { value: unknown }) {
    return (
        <span>
            {typeof value === "boolean" && <BooleanValue value={value} />}
            {typeof value === "number" && <NumberValue value={value} />}
            {value === undefined && <UndefinedValue />}
        </span>
    )
}

export function Item({ data, children, title }: { data: BaseExtension, children: React.ReactNode, title: string }) {
    return (
        <Tooltip title={`id: ${data.id}`} arrow>
            <Card>
                <CardHeader title={<>
                    {title} | critical: <BooleanValue value={data.critical} />
                </>} />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Tooltip>
    );
}

export type DedicatedKeys<T> = (keyof Omit<T, "name" | keyof BaseExtension>)[];


export function ByteArray({ value }: { value: string }) {
    return (
        <>
            {util.bytesToHex(value)}
        </>
    )
}