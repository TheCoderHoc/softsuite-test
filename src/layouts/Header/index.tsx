import "./styles.scss";
import { Avatar, Badge, Button, Input } from "antd";
import { AiFillBell, AiFillHome, AiOutlineSearch } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import profilePicSrc from "../../assets/images/profilePic.png";

export default function Header() {
    return (
        <header className="dashboard__header">
            <div className="dashboard__header-left">
                <div className="dashboard__header-left__organization">
                    <AiFillHome size={20} />
                    <div>
                        <span>Change Organization</span>
                        <h4>PaperSoft Limited</h4>
                    </div>

                    <FiChevronDown />
                </div>

                <form className="dashboard__header-left__search">
                    <Input
                        type="text"
                        size="large"
                        placeholder="Search for anything..."
                        id="searchInput"
                    />

                    <Button
                        className="btn-secondary"
                        icon={<AiOutlineSearch size={20} />}
                        size="large"
                    />
                </form>
            </div>

            <div className="dashboard__header-right">
                <Badge dot offset={[-5, 2]}>
                    <AiFillBell size={20} />
                </Badge>

                <div className="dashboard__header-right__user">
                    <Avatar src={profilePicSrc} alt="User profile picture" />
                    <div className="dashboard__header-right__user-info">
                        <span>Henry Okoro</span>
                        <span>Payroll Manager</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
