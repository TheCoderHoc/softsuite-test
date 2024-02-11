// import Breadcrumbs from "../../components/shared/Breadcrumbs";
import AppLayout from "../../layouts/AppLayout";
import "./styles.scss";
// import { allElementsPageBreadCrumbs } from "../../constants/breadcrumbs";
import CreateAndSearch from "../../components/shared/CreateAndSearch";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { Table } from "antd";
import allElementsTableColumns, {
    AllElementsTableColumnType,
} from "../../constants/elementTableColumn";
import EmptyData from "../../components/shared/EmptyData";
import { fetchElements } from "../../redux/elements.slice";

export default function AllElements() {
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

    return (
        <AppLayout>
            {/* <Breadcrumbs items={allElementsPageBreadCrumbs} /> */}

            <div className="elements">
                <h2 className="elements__title">Elements</h2>

                <CreateAndSearch
                    onButtonClick={() => {}}
                    buttonTitle="Create Element"
                />

                <div className="elements__table">
                    {element.elements && element.elements.length > 0 ? (
                        <Table
                            columns={allElementsTableColumns()}
                            dataSource={dataSource}
                            pagination={{ pageSize: 10 }}
                            loading={element.fetching}
                        />
                    ) : (
                        <EmptyData message="There are no element links to display" />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
