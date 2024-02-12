
export default interface ElementType {
    categoryId: number,
    categoryValueId: number,
    classificationId: number,
    classificationValueId: number,
    createdAt: Date,
    description: string,
    effectiveEndDate: string,
    effectiveStartDate: string,
    id: string,
    modifiedBy: string,
    name: string,
    payFrequency: string,
    payRunId: number,
    payRunValueId: number,
    processingType: string,
    prorate: string,
    reportingName: string,
    selectedMonths: string[],
    status: string,
}

export interface LookupType {
    createdAt: string,
    description: string,
    id: string,
    lookupId: string,
    lookupName: string,
    name: string,
    status: string,
}

export interface ElementLinkType {
    additionalInfo: [];
    amount: number;
    amountType: string;
    automate: string;
    createdAt: string;
    departmentId: string;
    effectiveEndDate: string;
    effectiveStartDate: string;
    elementId: string;
    employeeCategoryId: string;
    employeeCategoryValueId: string;
    employeeTypeId: string;
    employeeTypeValueId: string;
    grade: string;
    gradeStep: string;
    id: string;
    jobTitleId: string;
    locationId: string;
    name: string;
    rate: number;
    status: string[] | string;
    suborganizationId: string;
    unionId: string;
    pension: string;
    housing: string;
    housingId: string,
    modifiedBy: string,
}
