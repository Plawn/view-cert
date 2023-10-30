import { Button } from '@mui/material';
import { downloadContent } from '../../../../utils/utils';
import { CrlElement } from '../App';

function getPem(crl: CrlElement) {
    downloadContent(crl.crl.pem, "crl.pem");
}

function getDer(crl: CrlElement) {
    downloadContent(crl.crl.der, "crl.crl");
}

/**
 * Format string in order to have each line with length equal to 64
 * @param pemString String to format
 * @returns Formatted string
 */
export function formatPEM(pemString: string): string {
    const PEM_STRING_LENGTH = pemString.length, LINE_LENGTH = 64;
    const wrapNeeded = PEM_STRING_LENGTH > LINE_LENGTH;

    if (wrapNeeded) {
        let formattedString = "", wrapIndex = 0;

        for (let i = LINE_LENGTH; i < PEM_STRING_LENGTH; i += LINE_LENGTH) {
            formattedString += pemString.substring(wrapIndex, i) + "\r\n"; // line sep ?
            wrapIndex = i;
        }

        formattedString += pemString.substring(wrapIndex, PEM_STRING_LENGTH);
        return formattedString;
    }
    else {
        return pemString;
    }
}

export type PEMType = "X509 CRL" | "CERTIFICATE"

// Following function is not used, to uncomment when found usage
/*
function makeDer(crl: pkijs.CertificateRevocationList) {
    return crl.toSchema().toBER()
}
*/


export default function Exporter(props: { crl: CrlElement}) {
    const { crl } = props;

    return (
        <div>
            <Button onClick={() => getPem(crl)}>
                Get PEM
            </Button>
            <Button onClick={() => getDer(crl)}>
                Get DER
            </Button>
        </div>
    )
}