import { Button } from "antd";
import successCheckmark from "../../../assets/icons/success-checkmark.png";
import "./styles.scss";

type MessageProps = {
    children: React.ReactNode;
    onButtonClick: () => void;
};

export default function Message({children, onButtonClick}: MessageProps) {
    return (
        <div className="message">
            <img src={successCheckmark} width={68} height={68} />

            <p>{children}</p>

            <Button className="btn-secondary" onClick={onButtonClick}>
                Close to Continue
            </Button>
        </div>
    );
}
