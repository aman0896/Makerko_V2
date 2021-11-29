const StringOperator = [
    {
        id: "===",
        name: "Equal to",
    },
    {
        id: "contains",
        name: "contains",
    },
    {
        id: "startWith",
        name: "Starts with",
    },
    {
        id: "endsWith",
        name: "Ends with",
    },
];

export default function FilterOperator(filterTypeName) {
    let result = null;
    const operators = [{ field: "StringOperator", operator: StringOperator }];
    operators.map((item) => {
        if (filterTypeName === item.field) {
            result = item.operator;
        }
    });
    return result;
}
