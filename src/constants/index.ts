export const DEPARTMENTS = ['CS',
    'Math','Science'];


    export const DEPARTMENT_OPTIONS = DEPARTMENTS.map((department) => ({
        value: department.toLowerCase(),
        label: department,
    }));