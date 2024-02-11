import "./styles.scss";
import { Button } from "antd";
import { useAppSelector } from "../../../redux/store";
import trashIconSrc from "../../../assets/icons/trash-icon.png";

type TrashElementProps = {
    onTrashElement: (elementId: string) => void;
    elementToTrashId: string;
};

export default function TrashElement({
    onTrashElement,
    elementToTrashId,
}: TrashElementProps) {
    const element = useAppSelector((state) => state.element);

    const handleTrashElement = () => {
        onTrashElement(elementToTrashId);
    };

    return (
        <div className="trashElement">
            <img src={trashIconSrc} width={68} height={68} alt="Trash Icon" />

            <p className="trashElement__mainText">
                Are you sure you want to <br /> delete this element?
            </p>

            <p className="trashElement__subText">
                You can't reverse this action
            </p>

            <div className="trashElement__buttons">
                <Button className="btn-default">Cancel</Button>
                <Button
                    className="btn-danger"
                    onClick={handleTrashElement}
                    loading={element.fetching}
                >
                    Yes, Delete
                </Button>
            </div>
        </div>
    );
}
