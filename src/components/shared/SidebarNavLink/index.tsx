import "./styles.scss";
import { useCollapse } from "react-collapsed";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { Link } from "react-router-dom";
import { SidebarNavLink as SidebarNavLinkProps } from "../../../types/sidebarNavLink";

export default function SidebarNavLink({
    label,
    href,
    icon,
    children,
}: SidebarNavLinkProps) {
    const something = () => {
        // disable other collapsed items when opened
        // use the useCallback hook
    };

    const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
        onTransitionStateChange: something,
    });

    const hasChildren = children && children?.length > 0;

    const isClickable = hasChildren ? { ...getToggleProps() } : {};

    return (
        <li
            className="nav__item"
            {...isClickable}
            style={{
                cursor: hasChildren ? "default" : "pointer",
            }}
        >
            <div className="nav__item__wrapper">
                <div
                    className={`nav__item__parentItemWrapper ${
                        href === "/elements" &&
                        "nav__item__parentItemWrapper-active"
                    }`}
                >
                    <div className="nav__item__parentItem">
                        <div className="nav__item__icon">
                            {icon.type === "ico" && icon.Icon ? (
                                <icon.Icon size={18} />
                            ) : (
                                <img
                                    src={icon.imgSrc}
                                    alt=""
                                    width={18}
                                    height={18}
                                />
                            )}
                        </div>

                        <div className="nav__item__label">
                            <span>{label.mainText}</span>
                            {<h3>{label.subText}</h3>}
                        </div>
                    </div>

                    <div className="nav__item__arrow">
                        {hasChildren &&
                            (isExpanded ? (
                                <FiChevronUp
                                    size={18}
                                    style={{ fill: "$primary-color" }}
                                />
                            ) : (
                                <FiChevronDown
                                    size={18}
                                    style={{ fill: "$primary-color" }}
                                />
                            ))}
                    </div>
                </div>
            </div>

            <ul className="nav__item__childItems" {...getCollapseProps()}>
                {children?.map(({ id, label, href }) => (
                    <li
                        key={id}
                        className={`${
                            label === "Elements" &&
                            "nav__item__childItems__link"
                        }`}
                    >
                        <Link to={href}>{label}</Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}
