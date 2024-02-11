import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { InitialElementFieldsType } from "../InitialElementDetails";
import { Button, Input, Radio, Select, Switch } from "antd";
import InputErrorMessage from "../../shared/InputErrorMessage";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { addElement, fetchElements } from "../../../redux/elements.slice";
import { months } from "../../../constants/months";
import { useState } from "react";

type FormValue = {
    startDate: string;
    endDate: string;
    processingType: "open" | "closed";
    payFrequency: "Monthly" | "Selected Months";
    payMonths: string[];
    prorate: "Yes" | "No";
};

type Status = "Active" | "Inactive";

type AdditionalElementDetailsProps = {
    initialFields: InitialElementFieldsType | undefined;
    onPrev: () => void;
    onNext: () => void;
};

export default function AdditionalElementDetails({
    initialFields,
    onPrev,
    onNext,
}: AdditionalElementDetailsProps) {
    const [status, setStatus] = useState<Status>("Inactive");
    const element = useAppSelector((state) => state.element);

    const dispatch = useAppDispatch();

    const {
        handleSubmit,
        watch,
        control,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            startDate: "",
            endDate: "",
            processingType: "open",
            payFrequency: "Monthly",
            payMonths: [],
            prorate: "Yes",
        },
    });

    const errorMsgs = {
        startDate: "",
        endDate: "",
        processingType: "",
        payFrequency: "",
        payMonths: "",
        prorate: "",
    };

    if (errors.startDate?.type === "required") {
        errorMsgs.startDate = "Please input an effective start date";
    }

    if (errors.endDate?.type === "required") {
        errorMsgs.endDate = "Please input an effective end date";
    }

    if (errors.processingType?.type === "required") {
        errorMsgs.processingType = "Please choose a processing type";
    }

    if (errors.payFrequency?.type === "required") {
        errorMsgs.payFrequency = "Please choose a pay frequency";
    }

    if (errors.prorate?.type === "required") {
        errorMsgs.prorate = "Please choose a prorate";
    }

    const payMonthOptions = months.map((month) => ({
        label: month,
        value: month,
    }));

    const handleStatusChange = () => {
        setStatus(status === "Active" ? "Inactive" : "Active");
    };

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const allFields = {
            ...initialFields,
            ...data,
        };

        const {
            name,
            description,
            payrun,
            classification,
            category,
            reportingName,
            processingType,
            prorate,
            startDate,
            endDate,
            payMonths,
            payFrequency,
        } = allFields;

        const payload = {
            name,
            description,
            payrunId: payrun?.value,
            payRunValueId: payrun?.label,
            classificationId: classification?.value,
            classificationValueId: classification?.label,
            categoryId: category?.value,
            categoryValueId: category?.label,
            reportingName: reportingName,
            processingType: processingType,
            status,
            prorate,
            effectiveStartDate: startDate,
            effectiveEndDate: endDate,
            selectedMonths: payMonths,
            payFrequency,
            modifiedBy: "Dave Wilson",
        };

        dispatch(addElement(payload))
            .then(() => {
                dispatch(fetchElements());

                onNext();
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    return (
        <form
            className="additionalElementDetails"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="startDate">Effective Start Date</label>
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                id="startDate"
                                size="large"
                                placeholder="Select Date"
                                status={errorMsgs.startDate && "error"}
                            />
                        )}
                    />
                    {errorMsgs.startDate && (
                        <InputErrorMessage message={errorMsgs.startDate} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="endDate">Effective End Date</label>
                    <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                id="endDate"
                                size="large"
                                placeholder="Select Date"
                                status={errorMsgs.endDate && "error"}
                            />
                        )}
                    />
                    {errorMsgs.endDate && (
                        <InputErrorMessage message={errorMsgs.endDate} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="processingType">Processing Type</label>
                    <Controller
                        name="processingType"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Radio.Group
                                {...field}
                                value={watch("processingType")}
                                id="processingType"
                                className="formGrid__group-bordered"
                            >
                                <Radio value="open">Open</Radio>
                                <Radio value="closed">Closed</Radio>
                            </Radio.Group>
                        )}
                    />
                    {errorMsgs.processingType && (
                        <InputErrorMessage message={errorMsgs.processingType} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="payFrequency">Pay Frequency</label>
                    <Controller
                        name="payFrequency"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Radio.Group
                                {...field}
                                value={watch("payFrequency")}
                                id="payFrequency"
                                className="formGrid__group-bordered"
                            >
                                <Radio value="Monthly">Monthly</Radio>
                                <Radio value="Selected Months">
                                    Selected Months
                                </Radio>
                            </Radio.Group>
                        )}
                    />
                    {errorMsgs.payFrequency && (
                        <InputErrorMessage message={errorMsgs.payFrequency} />
                    )}
                </div>
            </div>

            <div className="formGrid__group" style={{ marginTop: "2rem" }}>
                <label htmlFor="payMonths">Selected Pay Months</label>
                <Controller
                    name="payMonths"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            mode="tags"
                            style={{ width: "100%" }}
                            placeholder="Select months"
                            size="large"
                            id="payMonths"
                            options={payMonthOptions}
                            status={errorMsgs.payMonths && "error"}
                            disabled={watch("payFrequency") === "Monthly"}
                        />
                    )}
                />
                {errorMsgs.payMonths && (
                    <InputErrorMessage message={errorMsgs.payMonths} />
                )}
            </div>

            <div className="formGrid" style={{ marginTop: "2rem" }}>
                <div className="formGrid__group">
                    <label htmlFor="prorate">Prorate</label>
                    <Controller
                        name="prorate"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Radio.Group
                                {...field}
                                value={watch("prorate")}
                                id="prorate"
                                className="formGrid__group-bordered"
                            >
                                <Radio value="Yes">Yes</Radio>
                                <Radio value="No">No</Radio>
                            </Radio.Group>
                        )}
                    />
                    {errorMsgs.prorate && (
                        <InputErrorMessage message={errorMsgs.prorate} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="status">Status</label>
                    <div className="formGrid__group-bordered">
                        <Switch
                            value={status === "Active" ? true : false}
                            onChange={handleStatusChange}
                        />
                    </div>
                </div>
            </div>

            <div className="elementDetails__buttons-wrapper">
                <Button
                    className="btn-secondary-alt"
                    size="large"
                    onClick={onPrev}
                >
                    Back
                </Button>

                <Button
                    className="btn-secondary"
                    size="large"
                    htmlType="submit"
                    loading={element.fetching}
                >
                    Create New Element
                </Button>
            </div>
        </form>
    );
}
