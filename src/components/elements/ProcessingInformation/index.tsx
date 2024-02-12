import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Input, Radio, Select, Switch } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../../utils/axios";
import InputErrorMessage from "../../shared/InputErrorMessage";

type FormValue = {
    amountType: string;
    amount: string;
    startDate: string;
    endDate: string;
    automate: "yes" | "no";
};

interface ProcessingInformationProps {
    onCancel: () => void;
    onPrev: () => void;
    onNext: () => void;
    initialFields: any;
}

type Status = "Active" | "Inactive";

export default function ProcessingInformation({
    onNext,
    onPrev,
    initialFields,
}: ProcessingInformationProps) {
    const [status, setStatus] = useState<Status>("Active");

    const [fetching, setFetching] = useState(false);

    const [amountTypeOption, setAmountTypeOption] = useState();

    const params = useParams();

    const errorMsgs = {
        amountType: "",
    };

    const handleStatusChange = () => {
        setStatus(status === "Active" ? "Inactive" : "Active");
    };

    const {
        watch,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            automate: "yes",
        },
    });

    const onSubmit: SubmitHandler<FormValue> = async (data) => {
        const allFields = {
            ...initialFields,
            ...data,
        };

        const {
            name,
            suborganization,
            location,
            department,
            employeeCategory,
            employeeType,
            jobTitle,
            grade,
            gradeStep,
            union,
            amount,
            startDate,
            endDate,
            automate,
            housing,
        } = allFields;

        const payload = {
            name,
            elementId: params.id,
            suborganizationId: suborganization?.label,
            locationId: location?.label,
            departmentId: department?.label,
            employeeCategoryId: employeeCategory?.value,
            employeeCategoryValueId: employeeCategory?.label,
            employeeTypeId: employeeType?.value,
            employeeTypeValueId: employeeType?.label,
            jobTitleId: jobTitle,
            grade: grade?.label,
            gradeStep: gradeStep?.label,
            unionId: union,
            // @ts-ignore
            amountType: amountTypeOption?.label,
            amount,
            rate: 0,
            effectiveStartDate: startDate,
            effectiveEndDate: endDate,
            status,
            automate,
            additionalInfo: null,
            housingId: housing.label,
            modifiedBy: "Dave Wilson",
        };

        setFetching(true);

        try {
            await axiosInstance({
                method: "POST",
                url: `elements/${params.id}/elementlinks`,
                data: payload,
            });

            setFetching(false);

            onNext();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAmountTypeChange = (value: string, option: any) => {
        setValue("amountType", value);

        setAmountTypeOption(option);
    };

    if (errors.amountType?.type === "required") {
        errorMsgs.amountType = "Please select amount type";
    }

    return (
        <form className="elementDetails" onSubmit={handleSubmit(onSubmit)}>
            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="amountType">Amount Type</label>
                    <Controller
                        name="amountType"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="amountType"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select an Amount Type"
                                options={[
                                    { label: "Single", value: "1" },
                                    { label: "Bulk", value: "2" },
                                ]}
                                status={errorMsgs.amountType && "error"}
                                onChange={handleAmountTypeChange}
                            />
                        )}
                    />
                    {errorMsgs.amountType && (
                        <InputErrorMessage message={errorMsgs.amountType} />
                    )}
                </div>

                <div className="formGrid__group">
                    <label htmlFor="emptySelect">Amount</label>

                    <Controller
                        name="amount"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="text"
                                id="amount"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Enter Amount"
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="startDate">Effective Start Date</label>

                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                id="startDate"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Date"
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="endDate">Effective End Date</label>

                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="date"
                                id="endDate"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Date"
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="automate">Automate</label>

                    <Controller
                        name="automate"
                        control={control}
                        render={({ field }) => (
                            <Radio.Group
                                {...field}
                                value={watch("automate")}
                                id="automate"
                                className="formGrid__group-bordered"
                                defaultValue={watch("automate")}
                            >
                                <Radio value="yes">Yes</Radio>
                                <Radio value="no">No</Radio>
                            </Radio.Group>
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="Status">Status</label>

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
                    onClick={() => onPrev()}
                >
                    Back
                </Button>

                <Button
                    className="btn-secondary"
                    size="large"
                    htmlType="submit"
                    loading={fetching}
                >
                    Create A New Element Link
                </Button>
            </div>
        </form>
    );
}
