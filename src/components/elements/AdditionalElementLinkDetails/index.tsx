import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button, Select } from "antd";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../utils/axios";
import { GradeType, GradeStepType } from "../../../types/fieldTypes";
import { LookupType } from "../../../types/element";

type FormValue = {
    grade: string;
    gradeStep: string;
    union: string;
    pension: string;
    housing: string;
    loyalty: string;
};

interface AdditionalElementLinkDetailsProps {
    onCancel: () => void;
    onPrev: () => void;
    onNext: () => void;
    onUpdateInitialFields: (data: any) => void;
}

export default function AdditionalElementLinkDetails({
    onNext,
    onPrev,
    onUpdateInitialFields,
}: AdditionalElementLinkDetailsProps) {
    const [gradeOption, setGradeOption] = useState();
    const [gradeStepOption, setGradeStepOption] = useState();
    const [housingOption, setHousingOption] = useState();

    const [grades, setGrades] = useState<GradeType[]>();

    const gradeOptions = grades?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const [gradeSteps, setGradeSteps] = useState<GradeStepType[]>();

    const gradeStepOptions = gradeSteps?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const [unions, setUnions] = useState<LookupType[]>();

    const unionOptions = unions?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const [housing, setHousing] = useState<LookupType[]>();

    const housingOptions = housing?.map(({ name, id }) => ({
        label: name,
        value: id,
    }));

    const { handleSubmit, control, setValue } = useForm<FormValue>();

    const onSubmit: SubmitHandler<FormValue> = (data) => {
        onUpdateInitialFields({
            ...data,
            grade: gradeOption,
            gradeStep: gradeStepOption,
            housing: housingOption,
        });

        onNext();
    };

    useEffect(() => {
        const urls = [
            "grade",
            "lookups/8/lookupvalues",
            "lookups/9/lookupvalues",
        ];

        async function fetchGradeOptions() {
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

                setGrades(data[0]);
                setUnions(data[1]);
                setHousing(data[2]);
            } catch (error) {
                console.log(error);
            }
        }

        fetchGradeOptions();
    }, []);

    async function fetchGradeSteps(gradeId: string) {
        try {
            const response = await axiosInstance({
                method: "GET",
                url: `/grade/${gradeId}/gradesteps
                `,
            });

            setGradeSteps(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeGrade = (value: string, option: any) => {
        setValue("grade", value);

        setGradeOption(option);

        fetchGradeSteps(value);
    };

    const handleChangeGradeStep = (value: string, option: any) => {
        setValue("gradeStep", value);

        setGradeStepOption(option);
    };

    const handleChangeHousing = (value: string, option: any) => {
        setValue("housing", value);

        setHousingOption(option);
    };

    return (
        <form className="elementDetails" onSubmit={handleSubmit(onSubmit)}>
            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="grade">Grade</label>
                    <Controller
                        name="grade"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="grade"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select a Grade"
                                options={gradeOptions}
                                onChange={handleChangeGrade}
                            />
                        )}
                    />
                </div>
                <div className="formGrid__group">
                    <label htmlFor="gradeStep">Grade Step</label>

                    <Controller
                        name="gradeStep"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="gradeStep"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select a Grade Step"
                                options={gradeStepOptions}
                                onChange={handleChangeGradeStep}
                            />
                        )}
                    />
                </div>
            </div>

            <div className="formGrid__group" style={{ margin: "2rem 0" }}>
                <label htmlFor="union">Union</label>

                <Controller
                    name="union"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            id="union"
                            size="large"
                            style={{ width: "100%" }}
                            placeholder="Select a Union"
                            options={unionOptions}
                        />
                    )}
                />
            </div>

            <h3 className="text-primary">Additional Assignment Information</h3>

            <div className="formGrid">
                <div className="formGrid__group">
                    <label htmlFor="pension">Pension</label>

                    <Controller
                        name="pension"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="pension"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Pension"
                                options={[]}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="housing">Housing</label>

                    <Controller
                        name="housing"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="housing"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Housing"
                                options={housingOptions}
                                onChange={handleChangeHousing}
                            />
                        )}
                    />
                </div>

                <div className="formGrid__group">
                    <label htmlFor="loyalty">Loyalty Bonus</label>

                    <Controller
                        name="loyalty"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                id="loyalty"
                                size="large"
                                style={{ width: "100%" }}
                                placeholder="Select Loyalty Bonus"
                                options={[]}
                            />
                        )}
                    />
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
                >
                    Next
                </Button>
            </div>
        </form>
    );
}
