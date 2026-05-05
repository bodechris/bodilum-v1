import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { parseISO } from "date-fns";

// generate unique id
export const genUUID = (num = 12) => Math.random().toString(36).substring(2, num);

// recursively step through a nested object to get value
export const getValueNestedObj = (obj: any, path: any) => path.split('/').reduce((o: any, p: any) => o[p], obj);

// convert a path name to array 
export const getPathNameArr = (pathname: any) => {
    let pathArr = pathname.split('/');
    pathArr.shift();
    return pathArr;
}

// check if button is active
export const isBtnActive = (btnPagePathArr: string[], curPath: string) => {
    if (!btnPagePathArr) return;
    if (!curPath) return;
    let pathArr = getPathNameArr(curPath);

    const active = btnPagePathArr.every((v) => pathArr.includes(v)) ? true : false; 

    // console.log(active, btnPagePathArr, pathArr );

    return active;
}

// sum of all the numbers in an array
export const sumNumArray = (arr: Array<number>) => {
    let total = arr.reduce((t: number, c: number) => (t + c), 0);
    return total;
}


// function to shorten text, add elipsis if too long, and capitalize first character
export const shortenTxt = (text: string, len = 10) => {

    if (!text) return;

    text = text.trim();

    let shortenedTxt = (text.length > len) ? `${text.slice(0, len)}...` : text;

    if (shortenedTxt.length > 0) {
        // capitalize the first character
        shortenedTxt = shortenedTxt.charAt(0).toUpperCase() + shortenedTxt.slice(1);
    }

    return shortenedTxt;

}


// function to generate random uuid
export const genUUID2 = () => Date.now().toString(36) + Math.random().toString(36).substring(2).substring(5, 12);

// function to debounce

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// `wait` milliseconds.
export const debounce = (func: Function, wait = 300) => {
    let timeout: NodeJS.Timeout | string | number | undefined;

    // This is the function that is returned and will be executed many times
    // We spread (...args) to capture any number of parameters we want to pass
    return function executedFunction(...args: any[]) {

        // The callback function to be executed after
        // the debounce time has elapsed
        const later = () => {
            // null timeout to indicate the debounce ended
            timeout = undefined;

            // Execute the callback
            func(...args);
        };
        // This will reset the waiting every function execution.
        // This is the step that prevents the function from
        // being executed because it will never reach the
        // inside of the previous setTimeout
        clearTimeout(timeout);

        // Restart the debounce waiting period.
        // setTimeout returns a truthy value (it differs in web vs Node)
        timeout = setTimeout(later, wait);
    };
};


/// function to test if variable is an object
export function isObject(item: any) {
    return (typeof item === "object" && !Array.isArray(item) && item !== null);
}


// Clamp number between two values
export const clamp = (val: number, min: number, max: number) => Math.min(Math.max(val, min), max);


// function to simulate a delay
export const wait = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));


// function to convert numbers to english words
export const numToWords = (s: number) => {
    if (s < 0) return false;

    const single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (s === 0) return 'Zero';

    const translate = (s: number) => {
        let word = "";
        if (s < 10) {
            word = single_digit[s] + ' ';
        } else if (s < 20) {
            word = double_digit[s - 10] + ' ';
        } else if (s < 100) {
            const rem = translate(s % 10);
            word = below_hundred[(s - s % 10) / 10 - 2] + ' ' + rem;
        } else if (s < 1000) {
            word = single_digit[Math.trunc(s / 100)] + ' Hundred ' + translate(s % 100);
        } else if (s < 1000000) {
            word = translate(Math.floor(s / 1000)).trim() + ' Thousand ' + translate(s % 1000);
        } else if (s < 1000000000) {
            word = translate(Math.floor(s / 1000000)).trim() + ' Million ' + translate(s % 1000000);
        } else {
            word = translate(Math.floor(s / 1000000000)).trim() + ' Billion ' + translate(s % 1000000000);
        }
        return word;
    }

    const result = translate(s);
    return result.toLowerCase().trim();
}


export function isValidBase64(str: string) {
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*?(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(str);
}

// deep copy object
export const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));

// automatically trigger download
export function triggerDownload(url: string, filename: string) {
    const link = document.createElement('a'); // Create an <a> element
    link.target = "_blank";
    link.href = url; // Set the href to the download URL
    link.download = filename; // Set the download attribute with a filename
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Programmatically click the link
    document.body.removeChild(link); // Remove the link from the document
}


export const isPromise = (obj: any): obj is Promise<any> =>
    obj instanceof Promise || (obj !== null && typeof obj === "object" && typeof obj.then === "function");


export const escapeRegExp = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');


export const opacityToHex = (opacity: number, useSingleDigit = false) => {
    if (typeof opacity !== "number" || opacity < 0 || opacity > 1) {
        // throw new Error("Opacity must be a number between 0 and 1.");
        // opacity should be assumed to be 1
        return '';
    }

    let hex: string | number = useSingleDigit ? Math.round((opacity * 15)).toString(16) : Math.round(opacity * 255).toString(16).padStart(2, "0");
    return hex;
}


export const getFileTypeFromUrl = (url: string) => {
    const imageRegex = /\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?(#.*)?$/i;
    const videoRegex = /\.mp4(\?.*)?(#.*)?$/i;

    if (imageRegex.test(url)) {
        return 'image';
    } else if (videoRegex.test(url)) {
        return 'video';
    } else {
        return 'unknown';
    }
}


export function parsePercentage(str: string) {
    const cleaned = str.trim().replace(/%/g, "").trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
}


export function reverseObject(obj: Record<string, any>) {
    return Object.fromEntries(Object.entries(obj).reverse());
}


export function genUUID3(byts: number = 32) {
    return crypto.randomBytes(byts || 2).toString('hex');
}

export function genUUID4() {
    return (Buffer.from(uuidv4().replace(/-/g, ""), "hex").toString('base64')).replace(/[!@#$%^&*+\=\/]/g, "");
}

export function camelToWords(str: string) {
    return str.replace(/([a-z])([A-Z])/g, '$1 $2');
}


// export function insertTextAtCursor(text: string) {
//   const sel = window.getSelection();
//   if (!sel || !sel.rangeCount) return;

//   const range = sel.getRangeAt(0);
//   range.deleteContents();

//   range.insertNode(document.createTextNode(text));

//   // Move caret after inserted text
//   range.setStartAfter(range.endContainer);
//   range.collapse(true);

//   sel.removeAllRanges();
export function insertTextAtCursor(text: string) {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;

    const range = sel.getRangeAt(0);
    range.deleteContents();

    range.insertNode(document.createTextNode(text));

    // Move caret after inserted text
    range.setStartAfter(range.endContainer);
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
}

export function escapeHTML(html: string) {
    return String(html)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}


export function toFormData(obj: any, form = new FormData(), prefix?: string): FormData {
  if (obj == null) return form;

  // FileList → files[]
  if (typeof FileList !== 'undefined' && obj instanceof FileList) {
    Array.from(obj).forEach((file, i) => form.append(prefix!, file));
    return form;
  }

  // File, Blob
  if (obj instanceof File || obj instanceof Blob) {
    form.append(prefix!, obj);
    return form;
  }

  // Date → ISO
  if (obj instanceof Date) {
    form.append(prefix!, obj.toISOString());
    return form;
  }

  // Array
  if (Array.isArray(obj)) {
    obj.forEach((v, i) => {
      const key = `${prefix}[${i}]`;
      toFormData(v, form, key);
    });
    return form;
  }

  // Object
  if (typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      const key = prefix ? `${prefix}.${k}` : k; // use `user.name` style keys
      toFormData(v, form, key);
    });
    return form;
  }

  // Primitive
  form.append(prefix!, String(obj));
  return form;
}


// random color
export function getRandomColor() {
    return ( `#${ [...Array.from({ length: 3 }, (_, i) => Math.floor(Math.random() * 156 + 100))].map(v => v.toString(16).padStart(2, "0")).join("")}`);
}


// are array equal version 0
export function areArraysEqualV0(arr1: any[], arr2: any[]) {
    if( arr1.length !== arr2.length ) return false;

    return arr1.every( (val, index) => val === arr2[index] );
}


export const timeAgo = (date: string | number | Date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hrs ago`;
  return `${days} days ago`;
};


const dateTimeLabels = [
  "Today",
  "Yesterday",
  "2 days ago",
  "3 days ago",
  "This week",
  "Last week",
  "2 weeks ago",
  "3 weeks ago",
  "1 month ago",
  "2 months ago",
  "3 months ago",
  "Older",
] as const;

type DateTimeLabel = (typeof dateTimeLabels)[number];



export function getDateTimeLabel(
  isoString: string,
  now: Date = new Date()
): DateTimeLabel {
  const d = parseISO(isoString);
  if (Number.isNaN(d.getTime())) return "Older";

  const MS_DAY = 24 * 60 * 60 * 1000;

  // Compare by LOCAL day boundaries
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfThatDay = new Date(d.getFullYear(), d.getMonth(), d.getDate());

  const dayDiff = Math.floor(
    (startOfToday.getTime() - startOfThatDay.getTime()) / MS_DAY
  );

  // Future dates: treat as "Today" (you can change this behavior if you want)
  if (dayDiff <= 0) return "Today";
  if (dayDiff === 1) return "Yesterday";
  if (dayDiff === 2) return "2 days ago";
  if (dayDiff === 3) return "3 days ago";

  // Week buckets (ISO-like: week starts Monday)
  const startOfWeek = (dt: Date) => {
    const x = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
    const dow = x.getDay(); // 0..6 (Sun..Sat)
    const mondayBased = (dow + 6) % 7; // Mon=0 ... Sun=6
    x.setDate(x.getDate() - mondayBased);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const thisWeekStart = startOfWeek(now);
  const thatWeekStart = startOfWeek(d);

  const weekDiff = Math.floor(
    (thisWeekStart.getTime() - thatWeekStart.getTime()) / (7 * MS_DAY)
  );

  if (weekDiff === 0) return "This week";
  if (weekDiff === 1) return "Last week";
  if (weekDiff === 2) return "2 weeks ago";
  if (weekDiff === 3) return "3 weeks ago";

  // Month buckets (calendar months)
  const monthDiff =
    (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());

  if (monthDiff === 1) return "1 month ago";
  if (monthDiff === 2) return "2 months ago";
  if (monthDiff === 3) return "3 months ago";

  return "Older";
}


export function getUserTimeInfo() {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const offset =
    new Intl.DateTimeFormat("en-ZA", {
      timeZone,
      timeZoneName: "shortOffset",
    })
      .formatToParts(new Date())
      .find((part) => part.type === "timeZoneName")?.value || "";

  return {
    timeZone,
    offset,
  };
}

export function formatMidnightAsZero(date: Date) {
  const hours24 = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const suffix = hours24 < 12 ? "AM" : "PM";

  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;

  const customHour =
    hours24 === 0 ? "00" : String(hours12).padStart(2, "0");

  return `${customHour}:${minutes} ${suffix}`;
}


export function reformatMidnightString(time: string) {
  return time.replace(/^12:(\d{2})\s?AM$/i, "00:$1 AM");
}