export const objectToArray = (obj) => {
    return Object.keys(obj).map(item => ({
        name: item,
        ...obj[item]
    }));
};



export const mapObjectAndAddValue = (obj) => {
    return Object.keys(obj).reduce((acc, cur) => {
        acc[cur] = {
            ...obj[cur], value: ''
        };

        return acc;
    }, {});
};
