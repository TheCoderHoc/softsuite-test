import { Dropdown, MenuProps, TableProps } from "antd";
import { Tag } from "antd";
import { formatDate } from "date-fns";
import { AiOutlineEye } from "react-icons/ai";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import dots from "../assets/icons/dots.png";
import InitialElementDetails, {
    InitialElementFieldsType,
} from "../components/elements/InitialElementDetails";
import AdditionalElementDetails from "../components/elements/AdditionalElementDetails";

export interface AllElementsTableColumnType {
    key: string;
    name: string;
    category: any;
    classification: any;
    status: string;
    dateTimeModified: Date;
    modifiedBy: string;
    id: string;
}

const dropdownMenuItems = (
    record: AllElementsTableColumnType
): MenuProps["items"] => {
    return [
        {
            key: "1",
            label: (
                <Link to={`/elements/${record.id}`}>
                    <span className="elements__table__dropdown__item">
                        <AiOutlineEye size={18} />
                        <span>View Element Links</span>
                    </span>
                </Link>
            ),
        },

        {
            key: "2",
            label: (
                <span className="elements__table__dropdown__item">
                    <CiEdit size={18} />
                    <span>Edit Element</span>
                </span>
            ),
        },

        {
            key: "3",
            label: (
                <span
                    className="elements__table__dropdown__item"
                    style={{ color: "red" }}
                    onClick={() => {}}
                >
                    <CiTrash size={18} />
                    <span>Delete Element</span>
                </span>
            ),
        },
    ];
};

export const allElementsTableColumns =
    (): TableProps<AllElementsTableColumnType>["columns"] => {
        return [
            {
                title: "Name",
                dataIndex: "name",
                key: "name",
            },

            {
                title: "Element Category",
                dataIndex: "category",
                key: "category",
            },

            {
                title: "Element Classification",
                dataIndex: "classification",
                key: "classification",
            },

            {
                title: "Status",
                dataIndex: "status",
                key: "status",
                render(_, { status }) {
                    return (
                        <Tag
                            color={
                                status === "Active" ? "#F4FAF7" : "#E054530D"
                            }
                            style={{
                                color:
                                    status === "Active" ? "#4BAA79" : "#E05453",
                                textTransform: "capitalize",
                            }}
                        >
                            {status}
                        </Tag>
                    );
                },
            },

            {
                title: "Date & Time Modified",
                dataIndex: "dateTimeModified",
                key: "dateTimeModified",
                render(_, { dateTimeModified }) {
                    return formatDate(
                        new Date(dateTimeModified),
                        "dd-MM-yyyy || hh:mm a"
                    );
                },
            },

            {
                title: "Modified By",
                dataIndex: "modifiedBy",
                key: "modifiedBy",
            },

            {
                title: "Action",
                dataIndex: "action",
                key: "action",
                render(_, record) {
                    return (
                        <Dropdown
                            menu={{
                                items: dropdownMenuItems(record),
                            }}
                            trigger={["click"]}
                        >
                            <img src={dots} width={12} height={12} />
                        </Dropdown>
                    );
                },
            },
        ];
    };

export const allElementsPageStepItems = (
    prev: () => void,
    next: () => void,
    handleCancelCreateElement: () => void,
    handleUpdateInitialFields: (data: InitialElementFieldsType) => void,
    initialFields: InitialElementFieldsType | undefined
) => [
    {
        title: "Element Details",
        content: (
            <InitialElementDetails
                onPrev={prev}
                onNext={next}
                onCancel={handleCancelCreateElement}
                onUpdateFields={handleUpdateInitialFields}
            />
        ),
    },
    {
        title: "Additional Details",
        content: (
            <AdditionalElementDetails
                onPrev={prev}
                onNext={next}
                initialFields={initialFields}
            />
        ),
    },
];
