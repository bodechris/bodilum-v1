
import { useEffect, useState } from 'react';
import { FormFieldValidationResultType1 } from '../general/Types';

import { z } from 'zod';

// type ValidateFormType = {
//     entry: string | number | object,
//     rules: object,
//     errorMsg: string | object
// }

export default function useFormValidation() {

    let isValid = false;
    let isValidArr: boolean[] = [];
    let isValidRes;
    let msg: string | {} = "";

    const [canValidate, setCanValidate] = useState( false );

    // onmount
    useEffect(() => {
        // console.log('form validation onmount...');
        // prevent validation onmount
        if( !canValidate ) setCanValidate(true);
    }, []);


    // SCHEMAS
    
    // SCHEMAS END

    const validateForm = ( entry: string | number | object, rules: Record<string, any> = {}, errorMsg: string | object = "This field is required" ) => {
        
        return new Promise < FormFieldValidationResultType1 >( async (resolve ) => {
            if( !canValidate ) {
                resolve({ isValid: false, msg: "Form is not ready to validate" });
                return;
            }
            
            // console.log('Validating form: ', entry, isValid, msg, rules, errorMsg);
    
            const rulesArr = Object.keys( rules );

            // for not required fields
            if ( !rulesArr.length || (rulesArr.length > 0 && !entry && !rulesArr.includes( 'required' )) ) {
                isValid = true;
                msg = '';
                resolve ({ isValid, msg });
                // console.log('Not required: ', isValid, msg, rules, rulesArr);
                return;
            }

            rulesArr.map( async (v, i) => {

                // console.log('Rule: ', i, " ----- ", v);

                if(typeof(entry) !== "string") {
                    msg = typeof errorMsg === 'object' ? (errorMsg as Record<string, string>)[v] || "This field is required" : (errorMsg || "This field is required");

                    return;
                }

                switch( v ) {
                    case 'required':

                        if (entry === null || entry === undefined || entry === "") {
                            msg = typeof errorMsg === 'object' ? (errorMsg as Record<string, string>)['required'] || "This field is required" : (errorMsg || "This field is required");
                            isValid = false;
                        } else {
                            isValid = true;
                        }
                        
                        isValidArr.push(isValid);
                    break;
                    case 'email':
                        const emailSchema = z.string().email();
                        isValidRes = emailSchema.safeParse( entry.trim() );
                        isValid = isValidRes.success;
                        if (!isValidRes.success) {
                            msg = !entry ? "Please enter your email" : (errorMsg as Record<string, string>)['email'] || "Invalid email";
                        } else {
                            // console.log('Email is valid: ', isValidRes);
                        }
                        isValidArr.push(isValid);
                    break;
                    case 'isUnique':
                        // check server if email is unique
                    break;
                    case 'phone':
                        // check if phone number
                        const phoneRegex = /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/g;
                        // console.log('Phone isValid: ', phoneRegex.test(entry));

                        isValid = phoneRegex.test(entry);
                        msg = !isValid ? ((errorMsg as Record<string, string>)['phone'] || `The phone number your provided is not a valid phone number`) : "";
                        isValidArr.push(isValid);
                        
                    break;
                    case 'min':
                        
                        const minVal = parseInt(rules['min']);
                        const minSchema = z.string().min(minVal, { message: `Must be ${minVal} or more characters long` });
                        isValidRes = minSchema.safeParse( entry.trim() );
                        isValid = isValidRes.success;
                        if (!isValidRes.success) {
                            msg = (errorMsg as Record<string, string>)['min'] || `Must be ${minVal} or more characters long`;
                        } else {
                        }

                        isValidArr.push(isValid);

                    break;
                    case 'max':
                        const maxVal = parseInt(rules['max']);
                        const maxSchema = z.string().max(maxVal, { message: `Must be ${maxVal} or more characters long` });
                        isValidRes = maxSchema.safeParse( entry.trim() );
                        isValid = isValidRes.success;
                        if (!isValidRes.success) {
                            msg = (errorMsg as Record<string, string>)['max'] || `Must be ${maxVal} or fewer characters long`;
                        } else {
                        }

                        isValidArr.push(isValid);
                        
                    break;
                    case 'specialChars':
                        // const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        const specialCharsRegex = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
                        const specialCharsSchema = z.string().regex(specialCharsRegex, { message: `Must contain at least a special character` });
                        isValidRes = specialCharsSchema.safeParse( entry.trim() );
                        isValid = isValidRes.success;
                        if (!isValidRes.success) {
                         msg = (errorMsg as Record<string, string>)['specialChars'] || `Must contain at least a special character`;
                        }

                        isValidArr.push(isValid);
                    break;
                    case 'hasCapital':
                        const hasCapitalRegex = /[A-Z]/;
                        const hasCapitalSchema = z.string().regex(hasCapitalRegex);
                        isValidRes = hasCapitalSchema.safeParse( entry.trim() ); 
                        isValid = isValidRes.success;
                        if (!isValidRes.success) {
                            msg = (errorMsg as Record<string, string>)['hasCapital'] || `Must contain at least one capital letter`;
                        } else {
                        }

                        isValidArr.push(isValid);

                    break;
                    default: 
                    break;
                }

                // in the end
                if( i === rulesArr.length - 1 ) {
                    // console.log('All valid: ', isValidArr);
                    resolve ({ isValid: isValidArr.every((v) => v ), msg });
                }
                return false;

            });

        });
    }
    return [validateForm];
}