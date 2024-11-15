
export const API_PATH = 'https://localhost:7135/api';

export const CreateHeadersConfigWithToken = () => {
    const token = sessionStorage.getItem('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
    return config;
};


export const convertToCustomMonthDate = (inputDate, locales, monthOption) => {
    var inputDateObj = new Date(inputDate);
    var options = { year: 'numeric', month: monthOption, day: 'numeric' };
    return inputDateObj.toLocaleDateString(locales, options);
};