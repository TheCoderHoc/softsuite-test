import { Controller, SubmitHandler, useForm } from "react-hook-form";
import "./styles.scss";
import { Button, Input, Select } from "antd";
import InputErrorMessage from "../../shared/InputErrorMessage";
import { useEffect, useState } from "react";
import { DepartmentType, SuborganizationType } from "../../../types/fieldTypes";
import { LookupType } from "../../../types/element";
import { axiosInstance } from "../../../utils/axios";

type FormValue = {
    name: string;
    subOrganization: string;
    department: string;
    jobTitle: string;
    location: string;
    employeeType: string;
    employeeCategory: string;
};

type StaffInformationProps = {
    onCancel: () => void;
    onPrev: () => void;
    onNext: () => void;
    onUpdateInitialFields: (data: any) => void;
};

export default function StaffInformation({
    onNext,
    onCancel,
    onUpdateInitialFields,
}: StaffInformationProps) {
    const [subOrganizations, setSubOrganizations] =
        useState<SuborganizationType[]>();
    const [departments, setDepartments] = useState<DepartmentType[]>();
    const [jobTitles, setJobTitles] = useState<LookupType[]>();
    const [locations, setLocations] = useState<LookupType[]>();
    const [employeeTypes, setEmployeeTypes] = useState<LookupType[]>();
    const [employeeCategories, setEmployeeCategories] =
        useState<LookupType[]>();

    const [subOrganizationOption, setSubOrganizationOption] = useState();
    const [departmentOption, setDepartmentOption] = useState();
    const [employeeCategoryOption, setEmployeeCategoryOption] = useState();
    const [locationOption, setLocationOption] = useState();
    const [employeeTypeOption, setEmployeeTypeOption] = useState();

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<FormValue>({
        defaultValues: {
            name: "",
        },
    });

    const errorMsgs = {
        name: "",
        department: "",
        jobTitle: "",
        location: "",
        employeeType: "",
        employeeCategory: "",
    };

    if (errors.name?.type === "required") {
        errorMsgs.name = "Please input element link name";
    }

    const subOrganizationOptions = subOrganizations?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const departmentOptions = departments?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const jobTitleOptions = jobTitles?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const locationOptions = locations?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const employeeOptions = employeeTypes?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const employeeCategoryOptions = employeeCategories?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    // FETCH SUB-SUBORGANIZATION DATA
    useEffect(() => {
        const urls = [
            "suborganizations",
            "lookups/6/lookupvalues",
            "lookups/7/lookupvalues",
            "lookups/4/lookupvalues",
            "lookups/3/lookupvalues",
        ];

        async function fetchSelectOptions() {
            try {
                const data = await Promise.all(
                    urls.map(async (url) => {
                        const response = await axiosInstance({
                            method: "GET",
                            url,
                        });

                        return response.data?.data || response.data;
                    })
                );

                setSubOrganizations(data[0]);
                setJobTitles(data[1]);
                setLocations(data[2]);
                setEmployeeTypes(data[3]);
                setEmployeeCategories(data[4]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchSelectOptions();
    }, []);

    async function fetchDepartments(subOrganizationId: string) {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/suborganizations/${subOrganizationId}/departments`,
            });

            setDepartments(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubOrgChange = (value: string, option: any) => {
        setValue("subOrganization", value);
        setSubOrganizationOption(option);

        fetchDepartments(value);
    };

    const handleDepartmentChange = (value: string, option: any) => {
        setValue("department", value);

        setDepartmentOption(option);
    };

    const handleChangeEmployeeCategory = (value: string, option: any) => {
        setValue("employeeCategory", value);

        setEmployeeCategoryOption(option);
    };

    const handleLocationChange = (value: string, option: any) => {
        setValue("location", value);

        setLocationOption(option);
    };

    const handleEmployeeTypeChange = (value: string, option: any) => {
        setValue("employeeType", value);

        setEmployeeTypeOption(option);
    };

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        onUpdateInitialFields({
            ...data,
            department: departmentOption,
            suborganization: subOrganizationOption,
            employeeCategory: employeeCategoryOption,
            location: locationOption,
            employeeType: employeeTypeOption,
        });

        onNext();
    };

    return (
        <form className="elementDetails" onSubmit={handleSubmit(onSubmit)}>
            <div className="formGrid__group" style={{ marginBottom: "2rem" }}>
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
                            placeholder="Enter Element Link Name"
                            status={errorMsgs.name && "error"}
                        />
                    )}
                />
                {errorMsgs.name && (
                    <InputErrorMessage message={errorMsgs.name} />
                )}
            </div>

            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="suborganization">Suborganization</label>

                    <Controller
                        name="subOrganization"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="subOrganization"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Suborganization"
                                options={subOrganizationOptions}
                                onChange={handleSubOrgChange}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="department">Department</label>

                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="department"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Department"
                                options={departmentOptions}
                                onChange={handleDepartmentChange}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="payrun">Job Title</label>

                    <Controller
                        name="jobTitle"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="payrun"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select a Job Title"
                                options={jobTitleOptions}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="location">Location</label>
                    <Controller
                        name="location"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="location"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select a Location"
                                options={locationOptions}
                                onChange={handleLocationChange}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="employeeType">Employee Type</label>

                    <Controller
                        name="employeeType"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="employeeType"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select an Employee Type"
                                options={employeeOptions}
                                onChange={handleEmployeeTypeChange}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="employeeCategory">Employee Category</label>

                    <Controller
                        name="employeeCategory"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="employeeCategory"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select an Employee Category"
                                options={employeeCategoryOptions}
                                onChange={handleChangeEmployeeCategory}
                            />
                        )}
                    />
                </div>
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
