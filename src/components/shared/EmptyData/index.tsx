import "./styles.scss";
import { IoWarningOutline } from "react-icons/io5";
import noDataPic from "../../../assets/images/no-data.png";

type EmptyDataProps = {
    message: string;
};

export default function EmptyData({ message }: EmptyDataProps) {
    return (
        <div className="emptyData">
            <img
                src={noDataPic}
                alt="Data Not Available"
                className="emptyData__image"
            />

            <div className="emptyData__messageWrapper">
                <IoWarningOutline size={16} color="#BE0E2B" />
                <h3 className="emptyData__message">{message}</h3>
            </div>
        </div>
    );
}
