
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