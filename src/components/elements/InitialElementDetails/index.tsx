import "./styles.scss";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { initialElementsLookups } from "../../../constants/initialElementsData";
import { axiosInstance } from "../../../utils/axios";
import { LookupType } from "../../../types/element";
import InputErrorMessage from "../../shared/InputErrorMessage";

type InitialElementDetailsProps = {
    onCancel: () => void;
    onPrev: () => void;
    onNext: () => void;
    onUpdateFields: (data: InitialElementFieldsType) => void;
};

type FormValue = {
    name: string;
    classification: string;
    category: string;
    payrun: string;
    description: string;
    reportingName: string;
};

type SelectOption = { label: string; value: string };

export type InitialElementFieldsType = {
    category: SelectOption | undefined;
    classification: SelectOption | undefined;
    payrun: SelectOption | undefined;
    name: string;
    description: string;
    reportingName: string;
};

export default function InitialElementDetails({
    onNext,
    onCancel,
    onUpdateFields,
}: InitialElementDetailsProps) {
    const [fieldOptions, setFieldOptions] = useState<SelectOption[][]>();
    const [selectOptions, setSelectOptions] = useState<SelectOption[][]>();

    //
    const [classificationOption, setClassificationOption] = useState<
        SelectOption | SelectOption[]
    >();
    const [categoryOption, setCategoryOption] = useState<
        SelectOption | SelectOption[]
    >();
    const [payrunOption, setPayrunOption] = useState<
        SelectOption | SelectOption[]
    >();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            name: "",
            description: "",
            reportingName: "",
        },
    });

    useEffect(() => {
        async function fetchLookupValues() {
            try {
                const responses: {
                    name: string;
                    data: LookupType[];
                }[] = await Promise.all(
                    initialElementsLookups.map(async ({ id, name }) => {
                        const response = await axiosInstance({
                            method: "GET",
                            url: `/lookups/${id}/lookupvalues/`,
                        });

                        return {
                            name,
                            data: response.data,
                        };
                    })
                );

                const options = responses?.map((option) => {
                    return option.data?.map(({ name, id }) => ({
                        label: name,
                        value: id,
                    }));
                });

                setFieldOptions(options);
                setSelectOptions(options);
            } catch (error) {
                console.log(error);
            }
        }

        fetchLookupValues();
    }, []);

    const errorMsgs = {
        name: "",
        classification: "",
        category: "",
        payrun: "",
        description: "",
        reportingName: "",
    };

    if (errors.name?.type === "required") {
        errorMsgs.name = "Please input element name";
    }

    if (errors.classification?.type === "required") {
        errorMsgs.classification = "Please select element classification";
    }

    if (errors.category?.type === "required") {
        errorMsgs.category = "Please select element category";
    }

    if (errors.payrun?.type === "required") {
        errorMsgs.payrun = "Please select element payrun";
    }

    if (errors.description?.type === "required") {
        errorMsgs.description = "Please input element description";
    }

    if (errors.reportingName?.type === "required") {
        errorMsgs.reportingName = "Please input element reporting name";
    }

    // lookups[0] === element category options
    // lookups[1] === element classification options
    // lookups[2] === element payruns
    const filterBy = (value: string) => {
        let fakeFieldOptions = fieldOptions && [...fieldOptions];

        let elementCatOptions =
            fakeFieldOptions &&
            fakeFieldOptions[0]?.filter((lookup) =>
                lookup.label.includes(value)
            );

        if (typeof fakeFieldOptions === "undefined") {
            fakeFieldOptions = [];
        }

        // @ts-ignore
        fakeFieldOptions[0] = elementCatOptions;

        return fakeFieldOptions;
    };

    const handleClassifyChange = (
        value: string,
        option: SelectOption | SelectOption[]
    ) => {
        setValue("classification", value);

        setClassificationOption(option);

        if (value === "7") {
            const newOptions = filterBy("Deduction");

            if (newOptions) {
                setSelectOptions([...newOptions]);
            }

            return;
        }

        if (value === "8") {
            const newOptions = filterBy("Earning");

            if (newOptions) {
                setSelectOptions([...newOptions]);
            }

            return;
        }

        setSelectOptions(fieldOptions);
    };

    const handleCategoryChange = (
        value: string,
        option: SelectOption | SelectOption[]
    ) => {
        setValue("category", value);

        setCategoryOption(option);
    };

    const handlePayrunChange = (
        value: string,
        option: SelectOption | SelectOption[]
    ) => {
        setValue("payrun", value);

        setPayrunOption(option);
    };

    const onSubmit: SubmitHandler<FormValue> = (data: FormValue) => {
        const initialFields = {
            ...data,
            category: categoryOption,
            classification: classificationOption,
            payrun: payrunOption,
        };

        // @ts-ignore
        onUpdateFields(initialFields);

        onNext();
    };

    return (
        <form className="elementDetails" onSubmit={handleSubmit(onSubmit)}>
            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="name">Element Name</label>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                id="name"
                                size="large"
                                placeholder="Enter element name"
                                status={errorMsgs.name && "error"}
                            />
                        )}
                    />
                    {errorMsgs.name && (
                        <InputErrorMessage message={errorMsgs.name} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="classification">
                        Element Classification
                    </label>

                    <Controller
                        name="classification"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="classification"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Classification"
                                options={selectOptions && selectOptions[1]}
                                onChange={handleClassifyChange}
                            />
                        )}
                    />

                    {errorMsgs.classification && (
                        <InputErrorMessage message={errorMsgs.classification} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="category">Element Category</label>

                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="category"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Category"
                                options={selectOptions && selectOptions[0]}
                                onChange={handleCategoryChange}
                            />
                        )}
                    />

                    {errorMsgs.category && (
                        <InputErrorMessage message={errorMsgs.category} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="payrun">Payrun</label>

                    <Controller
                        name="payrun"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="payrun"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Payrun"
                                options={selectOptions && selectOptions[2]}
                                onChange={handlePayrunChange}
                            />
                        )}
                    />

                    {errorMsgs.payrun && (
                        <InputErrorMessage message={errorMsgs.payrun} />
                    )}
                </div>
            </div>

            <div className="formGrid__group" style={{ marginTop: "2rem" }}>
                <label htmlFor="description">Description</label>
                <Controller
                    name="description"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input.TextArea
                            {...field}
                            id="description"
                            size="large"
                            placeholder="Enter description"
                        />
                    )}
                />

                {errorMsgs.description && (
                    <InputErrorMessage message={errorMsgs.description} />
                )}
            </div>

            <div className="formGrid__group" style={{ marginTop: "2rem" }}>
                <label htmlFor="reportingName">Reporting Name</label>

                <Controller
                    name="reportingName"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                        <Input.TextArea
                            {...field}
                            id="reportingName"
                            size="large"
                            placeholder="Enter reporting name"
                        />
                    )}
                />

                {errorMsgs.reportingName && (
                    <InputErrorMessage message={errorMsgs.reportingName} />
                )}
            </div>

            <div className="elementDetails__buttons-wrapper">
                <Button
                    className="btn-secondary-alt"
                    size="large"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    className="btn-secondary"
                    size="large"
                    htmlType="submit"
                >
                    Next
                </Button>
            </div>
        </form>
    );
}
