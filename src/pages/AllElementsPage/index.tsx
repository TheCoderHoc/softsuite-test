// import Breadcrumbs from "../../components/shared/Breadcrumbs";
import AppLayout from "../../layouts/AppLayout";
import "./styles.scss";
// import { allElementsPageBreadCrumbs } from "../../constants/breadcrumbs";
import CreateAndSearch from "../../components/shared/CreateAndSearch";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Breadcrumb, Modal, Steps, Table } from "antd";
import {
    allElementsTableColumns,
    AllElementsTableColumnType,
    allElementsPageStepItems,
    allElementsPageBreadcrumbItems,
} from "../../data/allElementPage";
import EmptyData from "../../components/shared/EmptyData";
import { fetchElements, trashElement } from "../../redux/elements.slice";
import Message from "../../components/shared/Message";
import { InitialElementFieldsType } from "../../components/elements/InitialElementDetails";
import TrashElement from "../../components/elements/TrashElement";
import { FiChevronRight } from "react-icons/fi";

export default function AllElements() {
    const [createElementModal, setCreateElementModal] = useState(false);
    const [trashElementModal, setTrashElementModal] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [initialFields, setInitialFields] =
        useState<InitialElementFieldsType>();

    const [elementToTrashId, setElementToTrashId] = useState("");

    const element = useAppSelector((state) => state.element);

    const dataSource: AllElementsTableColumnType[] = element.elements
        .map((element) => ({
            key: element.id,
            name: element.name,
            category: element.categoryValueId,
            classification: element.classificationValueId,
            status: element.status,
            dateTimeModified: element.createdAt,
            modifiedBy: element.modifiedBy,
            id: element.id,
        }))
        .reverse();

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchElements());
    }, []);

    const handleUpdateInitialFields = (data: InitialElementFieldsType) => {
        setInitialFields(data);
    };

    const handleTrashElement = async (elementId: string) => {
        try {
            await dispatch(trashElement(elementId));

            handleCancelTrashElementModal();

            dispatch(fetchElements());
        } catch (error: any) {
            console.log(error);
        }
    };

    // MODAL FUNCTIONS
    const handleOpenCreateElementModal = () => {
        setCreateElementModal(true);
    };

    const handleCancelCreateElement = () => {
        setCreateElementModal(false);

        setCurrentStep(0);
    };

    // SHOW TRASH ELEMENT MODAL
    const handleOpenTrashElementModal = (elementId: string) => {
        setTrashElementModal(true);

        setElementToTrashId(elementId);
    };

    // HIDE TRASH ELEMENT MODAL
    const handleCancelTrashElementModal = () => {
        setTrashElementModal(false);
    };

    const next = () => {
        setCurrentStep(currentStep + 1);
    };

    const prev = () => {
        setCurrentStep(currentStep - 1);
    };

    return (
        <AppLayout>
            <Breadcrumb
                items={allElementsPageBreadcrumbItems}
                separator={<FiChevronRight />}
            />

            <div className="elements">
                <h2 className="elements__title">Elements</h2>

                <CreateAndSearch
                    onButtonClick={handleOpenCreateElementModal}
                    buttonTitle="Create Element"
                />

                <div className="elements__table">
                    {element.elements && element.elements.length > 0 ? (
                        <Table
                            columns={allElementsTableColumns(
                                handleOpenTrashElementModal
                            )}
                            dataSource={dataSource}
                            pagination={{ pageSize: 10 }}
                            loading={element.fetching}
                        />
                    ) : (
                        <EmptyData message="There are no element links to display" />
                    )}
                </div>
            </div>

            <Modal
                open={createElementModal}
                footer={false}
                onCancel={handleCancelCreateElement}
                destroyOnClose={true}
                width={700}
            >
                {currentStep <= 1 ? (
                    <div>
                        <h2 className="elements__title-alt">Create Element</h2>

                        <Steps
                            current={currentStep}
                            items={allElementsPageStepItems(
                                prev,
                                next,
                                handleCancelCreateElement,
                                handleUpdateInitialFields,
                                initialFields
                            )}
                            size="small"
                            style={{ marginBottom: "3rem" }}
                        />

                        <div>
                            {
                                allElementsPageStepItems(
                                    prev,
                                    next,
                                    handleCancelCreateElement,
                                    handleUpdateInitialFields,
                                    initialFields
                                )[currentStep].content
                            }
                        </div>
                    </div>
                ) : (
                    <Message onButtonClick={handleCancelCreateElement}>
                        Element has been <br /> created successfully.
                    </Message>
                )}
            </Modal>

            <Modal
                open={trashElementModal}
                onCancel={handleCancelTrashElementModal}
                footer={false}
                width={400}
            >
                <TrashElement
                    onTrashElement={handleTrashElement}
                    elementToTrashId={elementToTrashId}
                />
            </Modal>
        </AppLayout>
    );
}
