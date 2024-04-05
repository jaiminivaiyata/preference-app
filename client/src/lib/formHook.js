import { useState } from 'react'

export function useFormFields(initial) {
    const [fields, setFields] = useState(initial);
    return [
        fields,
        (event) => {
            if (event && event.target) {
                setFields({
                    ...fields,
                    [event.target.name]: event.target.type === "file" ? (event.target.files && event.target.files.length > 1 ? [...event.target.files] : event.target.files[0]) : event.target.value
                });
            } else if (event && event.name) {
                setFields({
                    ...fields,
                    [event.name]: event.value
                });
            } else {
                setFields(event);
            }
        }
    ];
}