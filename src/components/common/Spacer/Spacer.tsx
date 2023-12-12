type Props = {
    direction: "vertical" | "horizontal";
    size: string | number;
}

export default function Spacer(props: Readonly<Props>) {
    const { direction, size } = props;
    if (direction === "vertical") {
        return (
            <div style={{ height: size }} />
        )
    } else {
        return (
            <div style={{ width: size }} />
        )
    }

}