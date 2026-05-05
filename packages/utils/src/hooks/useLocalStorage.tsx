import {useState, useEffect} from 'react';

const getvalue = (key: string, initialVal: any) => {
    let lsVal = window.localStorage.getItem(key);

    if(initialVal instanceof Function) return initialVal();

    if(lsVal) return JSON.parse(lsVal);

    return initialVal;
};

export default function useLocalStorage( key: string, value: any = "" ) {
    
    const [storedValue, setStoredValue] = useState(()=> getvalue(key, value));

    // console.log(storedValue, key, value);

    // Update the local storage when value changes.
    useEffect(() => {
        window.localStorage.setItem(key, value);
    }, [key]);

    return [storedValue, setStoredValue];
}

export function resetAll() {
    window.localStorage.clear();
}