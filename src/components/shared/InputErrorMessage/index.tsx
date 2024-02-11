import "./styles.scss";

type InputErrorMessageProps = {
    message: string;
};

export default function InputErrorMessage({ message }: InputErrorMessageProps) {
    return <small className="InputErrorMessage">{message}</small>;
}
