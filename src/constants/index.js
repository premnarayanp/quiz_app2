//export * from './constants';

//store items/token in local storage
export const setItemInLocalStorage = (key, value) => {
    console.error('key==', key, "value====", value);
    // if (!key || (!value && value !== 0 && value !== false)) {
    //     return console.error('Can not store in LS');
    // }

    if (!key) {
        return console.error('Can not store in LS');
    }

    const valueToStore =
        typeof value !== 'string' ? JSON.stringify(value) : value;

    localStorage.setItem(key, valueToStore);
};

//get items/token from local storage
export const getItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can get the value from LS');
    }

    return localStorage.getItem(key);
};

//remove key from local storage
export const removeItemFromLocalStorage = (key) => {
    if (!key) {
        return console.error('Can get the value from LS');
    }

    localStorage.removeItem(key);
};
