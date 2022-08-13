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

export const formatDate = (d) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const time = new Date(d);
    const min = time.getMinutes();
    const hour = time.getHours();
    const day = time.getDate();
    const month = months[time.getMonth()];
    const year = time.getFullYear();



    const clock = `${hour < 10 ? `0${hour}` : `${hour >= 12 ? (hour - 12) : hour}`}:${min < 10 ? `0${min}` : min}${hour <= 12 ? `AM` : `PM`}`;
    const date = `${day} ${month}, ${year}`;

    return { clock, date };
};