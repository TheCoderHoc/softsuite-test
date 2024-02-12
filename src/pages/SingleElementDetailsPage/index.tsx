import "./styles.scss";
import AppLayout from "../../layouts/AppLayout";
import BackButton from "../../components/shared/BackButton";
import { axiosInstance } from "../../utils/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElementType, { ElementLinkType } from "../../types/element";
import CreateAndSearch from "../../components/shared/CreateAndSearch";
import EmptyData from "../../components/shared/EmptyData";
import { Breadcrumb, Drawer, Modal, Steps, Table } from "antd";
import {
    SingleElementTableColumnType,
    singleElementDetailsSteps,
    singleElementPageBreadcrumbItems,
    singleElementTableColumns,
} from "../../data/singleElementPage";
import Message from "../../components/shared/Message";
import { AiOutlineCloseSquare } from "react-icons/ai";
import ElementLinkDetails from "../../components/elements/ElementLinkDetails";
import { FiChevronRight } from "react-icons/fi";

export default function SingleElementDetailsPage() {
    const [elementDetails, setElementDetails] = useState<ElementType>();
    const [elementLinks, setElementLinks] = useState<ElementLinkType[]>();
    const [elementLinkToView, setElementLinkToView] =
        useState<ElementLinkType>();

    const [initialFields, setInitialFields] = useState();

    const [createElementLinkModal, setCreateElementLinkModal] = useState(false);

    const [currentStep, setCurrentStep] = useState(0);

    const [drawerOpen, setDrawerOpen] = useState(false);

    const { id } = useParams();

    // @ts-ignore
    const dataSource: SingleElementTableColumnType[] = elementLinks
        ?.map((elementLink) => ({
            key: elementLink.id,
            name: elementLink.name,
            subOrganization: elementLink.suborganizationId,
            department: elementLink.departmentId,
            employeeCategory: elementLink.employeeCategoryValueId,
            amount: elementLink.amount,
            element: elementLink,
        }))
        .reverse();

    const handleOpenCreateElementLinkModal = () => {
        setCreateElementLinkModal(true);
    };
    const handleCancelCreateElementLinkModal = () => {
        setCreateElementLinkModal(false);

        setCurrentStep(0);

        fetchElementLinks();
    };

    const next = () => {
        setCurrentStep(currentStep + 1);
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleOpenDrawer = (elementLink: ElementLinkType) => {
        setDrawerOpen(true);

        setElementLinkToView(elementLink);
    };

    const handleCancelDrawer = () => {
        setDrawerOpen(false);
    };

    const handleUpdateInitialFields = (data: any) => {
        // @ts-ignore
        setInitialFields({ ...initialFields, ...data });
    };

    async function fetchElementDetails() {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/elements/${id}`,
            });

            setElementDetails(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchElementDetails();
    }, [id]);

    async function fetchElementLinks() {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/elements/${id}/elementlinks`,
            });

            setElementLinks(response.data.data.content);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchElementLinks();
    }, [id]);

    return (
        <AppLayout>
            <Breadcrumb
                items={singleElementPageBreadcrumbItems}
                separator={<FiChevronRight />}
            />

            <div className="single__element__details">
                <BackButton />

                <h1>Element Details</h1>

                <ul className="grid__details__list">
                    <li>
                        <span>Element Name</span>
                        <span>{elementDetails?.name}</span>
                    </li>

                    <li>
                        <span>elementDetails Classification</span>
                        <span>{elementDetails?.classificationValueId}</span>
                    </li>

                    <li>
                        <span>elementDetails Category</span>
                        <span>{elementDetails?.categoryValueId}</span>
                    </li>

                    <li>
                        <span>Payrun </span>
                        <span>{elementDetails?.payRunValueId}</span>
                    </li>

                    <li>
                        <span>Description</span>
                        <span>{elementDetails?.description}</span>
                    </li>

                    <li>
                        <span>Reporting Name</span>
                        <span>{elementDetails?.reportingName}</span>
                    </li>

                    <li>
                        <span>Effective Start Date</span>
                        <span>{elementDetails?.effectiveStartDate}</span>
                    </li>

                    <li>
                        <span>Effective End Date</span>
                        <span>{elementDetails?.effectiveEndDate}</span>
                    </li>

                    <li>
                        <span>Processing Type</span>
                        <span>{elementDetails?.processingType}</span>
                    </li>

                    <li>
                        <span>Pay Frequency</span>
                        <span>{elementDetails?.payFrequency}</span>
                    </li>

                    <li>
                        <span>Pay Months</span>
                        <span>
                            {elementDetails?.selectedMonths?.map((month) => (
                                <span key={month}>{`${month}, `}</span>
                            ))}
                        </span>
                    </li>

                    <li>
                        <span>Prorate</span>
                        <span>{elementDetails?.prorate}</span>
                    </li>

                    <li>
                        <span>Status</span>
                        <span>{elementDetails?.status}</span>
                    </li>

                    <li>
                        <span></span>
                        <span></span>
                    </li>
                </ul>

                <section className="single__element__details__section">
                    <h2 className="single__element__details__section__title">
                        Element Links
                    </h2>

                    <CreateAndSearch
                        onButtonClick={handleOpenCreateElementLinkModal}
                        buttonTitle="Create Element Link"
                    />

                    {elementLinks && elementLinks?.length > 0 ? (
                        <Table
                            columns={singleElementTableColumns(
                                handleOpenDrawer
                            )}
                            dataSource={dataSource}
                            pagination={{ pageSize: 10 }}
                        />
                    ) : (
                        <EmptyData message="There are no element links to display" />
                    )}
                </section>
            </div>

            <Modal
                open={createElementLinkModal}
                footer={false}
                onCancel={handleCancelCreateElementLinkModal}
                destroyOnClose={true}
                width={700}
            >
                {currentStep <= 2 ? (
                    <div>
                        <h2 className="elements__title-alt">
                            Create Element Link
                        </h2>

                        <Steps
                            current={currentStep}
                            items={singleElementDetailsSteps(
                                handleCancelCreateElementLinkModal,
                                prev,
                                next,
                                handleUpdateInitialFields,
                                initialFields
                            )}
                            size="small"
                            style={{ marginBottom: "3rem" }}
                            labelPlacement="vertical"
                        />

                        <div>
                            {
                                singleElementDetailsSteps(
                                    handleCancelCreateElementLinkModal,
                                    prev,
                                    next,
                                    handleUpdateInitialFields,
                                    initialFields
                                )[currentStep].content
                            }
                        </div>
                    </div>
                ) : (
                    <Message onButtonClick={handleCancelCreateElementLinkModal}>
                        Element link has been successfully created
                    </Message>
                )}
            </Modal>

            <Drawer
                open={drawerOpen}
                closeIcon={<AiOutlineCloseSquare color="#E05453" size={20} />}
                onClose={handleCancelDrawer}
                width={"40%"}
            >
                <ElementLinkDetails elementLink={elementLinkToView} />
            </Drawer>

            
        </AppLayout>
    );
}
