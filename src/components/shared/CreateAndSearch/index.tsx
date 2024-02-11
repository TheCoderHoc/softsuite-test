import "./styles.scss";
import { Button, Input } from "antd";
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";

type CreateAndSearchProps = {
    buttonTitle: string;
    onButtonClick: () => void;
};

export default function CreateAndSearch({
    buttonTitle,
    onButtonClick,
}: CreateAndSearchProps) {
    return (
        <div className="createAndSearch">
            <div className="createAndSearch__formWrapper">
                <form className="createAndSearch__form">
                    <Input
                        type="text"
                        placeholder="Search for anything..."
                        id="searchInput"
                    />

                    <Button
                        className="btn-secondary createAndSearch__searchButton"
                        icon={<AiOutlineSearch size={20} />}
                    />
                </form>

                <Button className="btn-primary" icon={<FaFilter size={17} />} />
            </div>

            <Button className="btn-secondary" onClick={onButtonClick}>
                {buttonTitle} <AiOutlinePlus color="#fff" />
            </Button>
        </div>
    );
}
