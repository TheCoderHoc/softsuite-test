import { Button, TableProps } from "antd";
import { ElementLinkType } from "../types/element";
import { CiEdit, CiTrash } from "react-icons/ci";
import StaffInformation from "../components/elements/StaffInformation";
import AdditionalElementLinkDetails from "../components/elements/AdditionalElementLinkDetails";
import ProcessingInformation from "../components/elements/ProcessingInformation";
import { Link } from "react-router-dom";

export interface SingleElementTableColumnType {
    key: string;
    name: string;
    subOrganization: string;
    department: string;
    employeeCategory: string;
    amount: number;
    element: ElementLinkType;
    elementLink: ElementLinkType;
}

export const singleElementTableColumns = (
    handleOpenDrawer: (elementLink: ElementLinkType) => void
): TableProps<SingleElementTableColumnType>["columns"] => {
    return [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },

        {
            title: "Sub-Organization",
            dataIndex: "subOrganization",
            key: "subOrganization",
        },

        {
            title: "Department",
            dataIndex: "department",
            key: "department",
        },

        {
            title: "Employee Category",
            dataIndex: "employeeCategory",
            key: "employeeCategory",
        },

        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
        },

        {
            title: "Details",
            dataIndex: "details",
            key: "details",
            render: (_, record) => (
                <Button
                    type="link"
                    className="btn-secondary-link"
                    onClick={() => handleOpenDrawer(record?.element)}
                >
                    View details
                </Button>
            ),
        },

        {
            title: "Actions",
            dataIndex: "actions",
            key: "actions",
            render: () => (
                <div className="single__element__details__actions">
                    <CiEdit size={18} />

                    <CiTrash size={18} />
                </div>
            ),
        },
    ];
};

export const singleElementDetailsSteps = (
    handleCancelCreateElementLinkModal: () => void,
    prev: () => void,
    next: () => void,
    handleUpdateInitialFields: (data: any) => void,
    initialFields: any
) => {
    return [
        {
            title: "Staff Information",
            content: (
                <StaffInformation
                    onCancel={handleCancelCreateElementLinkModal}
                    onPrev={prev}
                    onNext={next}
                    onUpdateInitialFields={handleUpdateInitialFields}
                />
            ),
        },
        {
            title: "Additional Information",
            content: (
                <AdditionalElementLinkDetails
                    onCancel={handleCancelCreateElementLinkModal}
                    onPrev={prev}
                    onNext={next}
                    onUpdateInitialFields={handleUpdateInitialFields}
                />
            ),
        },

        {
            title: "Processing Information",
            content: (
                <ProcessingInformation
                    onCancel={handleCancelCreateElementLinkModal}
                    onPrev={prev}
                    onNext={next}
                    initialFields={initialFields}
                />
            ),
        },
    ];
};

export const singleElementPageBreadcrumbItems = [
    {
        title: <Link to="/">Payroll Management</Link>,
    },
    {
        title: <Link to="/">Element Setup</Link>,
    },
    {
        title: <Link to="/elements">Elements</Link>,
    },
    {
        title: "Element Links",
    },
];
