import { Button } from "antd";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BackButton() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1);
    };

    return (
        <Button
            className="btn-secondary-alt"
            icon={<FaArrowLeft color="#4BAA79" />}
            onClick={handleClick}
        />
    );
}
