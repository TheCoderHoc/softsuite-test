export interface DepartmentType {
    createdAt: string,
    id: string,
    name: string,
    note: string,
    suborganizationId: string,
}

export interface GradeType {
    createdAt: string,
    description: string,
    id: string,
    name: string,
}

export interface GradeStepType {
    amount: string,
    createdAt: string,
    description: string,
    gradeId: string,
    id: string,
    name: string,
}

export interface SuborganizationType {
    createdAt: string,
    name: string,
    note: string,
    id: string,
}