import { Card, CardContent, Typography } from '@mui/material';
import { pki, util, pem, asn1 as forge_asn1 } from 'node-forge';
import Certificate from './Certificate';
import React, { useState } from 'react';
import FileInputField from '../../common/Form/FileInputField';
import LoadingComponent from '../../common/LoadingComponent/LoadingComponent';
import * as asn1 from 'asn1js';
import * as pkijs from 'pkijs';
import * as pvutils from 'pvutils';
import CRL from './CRL';
import { PEMType, formatPEM } from './CRL/exporter';

type ContainerFormat = "pem" | "der";

export type CrlElement = {
  type: "crl";
  crl: {
    crl: pkijs.CertificateRevocationList;
    pem: string, der: Uint8Array;
  };
  format: ContainerFormat;
};

export type CertificateElement = {
  type: "certificate";
  certificate: pki.Certificate;
  format: ContainerFormat;
};

// ElementType is never used, to uncomment when found the usage
// type ElementType = "crl" | "certificate" | "private_key";
type Result =
  CrlElement
  | CertificateElement
  | { type: "private_key", privateKey: pki.PrivateKey }

function makePem(crl: pkijs.CertificateRevocationList, type: PEMType) {
  let pem = formatPEM(pvutils.toBase64(pvutils.arrayBufferToString(crl.toSchema().toBER(false))));
  pem = `-----BEGIN ${type}-----\n${pem}\n-----END ${type}-----`;
  return pem;
}

function getCrl(buf: ArrayBuffer): CrlElement[] {
  try {
    // handle pem
    const text = new TextDecoder().decode(buf);
    const p = pem.decode(text);
    const buffer = new Uint8Array(util.binary.raw.decode(p[0].body));
    const asn1crl = asn1.fromBER(buffer.buffer);
    const crl = new pkijs.CertificateRevocationList({
      schema: asn1crl.result
    });
    return [{ type: "crl", crl: { crl, pem: text, der: buffer }, format: "pem" }];
  } catch (e) {
    // handle der
    const buffer = new Uint8Array(buf);
    const asn1crl = asn1.fromBER(buffer.buffer);
    const crl = new pkijs.CertificateRevocationList({
      schema: asn1crl.result
    });
    return [{ type: "crl", crl: { crl, pem: makePem(crl, "X509 CRL"), der: buffer }, format: "der" }];
  }
}

function getCertificate(buffer: ArrayBuffer): CertificateElement[] {
  try {
    const text = new TextDecoder().decode(buffer);
    const certificate = pki.certificateFromPem(text);
    return [{ type: "certificate", certificate, format: "pem" }];
  } catch (e) {
    // console.log('errr', e);
    // from der here
    const a = forge_asn1.fromDer(util.createBuffer(new Uint8Array(buffer)));
    const certificate = pki.certificateFromAsn1(a);
    return [{ type: "certificate", certificate, format: "der" }];
  }

}

function processBuffer(buffer: ArrayBuffer): Array<Result> {
  const processors = [getCertificate, getCrl]
  const results: Result[] = [];
  for (const proc of processors) {
    try {
      const res = proc(buffer);
      res.forEach(r => {
        results.push(r);
      });
    } catch (e) {
      // console.log('e2', e);
    }
  }
  return results;
}

export default function App() {

  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Result[]>([]);
  // const privateKey = pki.privateKeyFromPem(pemKey);
  const onFile = async (file: File) => {
    setLoading(true);
    const content = await file.arrayBuffer();
    console.log('content', content);
    try {
      const i = processBuffer(content);
      console.log('i', i);
      setItems(i);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
      }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <Typography>
          Choose a file
        </Typography>
        <FileInputField labelStyle={{ display: 'flex' }} onChange={onFile} />
      </div>
      <br />
      <LoadingComponent loading={loading}
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        {items.map(item => {
          if (item.type === "certificate") {
            return (
              <Card
                key={item.certificate.signature}
                style={{
                  maxWidth: '80ex',
                  minWidth: "10em",
                }}>
                <CardContent>
                  <Certificate certifcate={item} />
                </CardContent>
              </Card>
            )
          }
          if (item.type === "crl") {
            return (
              <Card
                key={item.crl.crl.signature.toString()}
                style={{
                  maxWidth: '80ex',
                  minWidth: "10em",
                }}>
                <CardContent>
                  <CRL crl={item} />
                </CardContent>
              </Card>
            )
          }
          return <></>;
        })
        }
      </LoadingComponent>
    </div>
  );
}
