export const validateObject = (validationObject, data) => {

    let isFormValid = true;

    Object.keys(validationObject).map((key)=>{

        if(validationObject[`${key}`].required && !data[`${key}`]){
            validationObject[`${key}`].isvalid = false;
            isFormValid = false;
        }
        else if(validationObject[`${key}`].required && data[`${key}`] && Array.isArray(data[`${key}`]) && data[`${key}`].length === 0 ){
            validationObject[`${key}`].isvalid = false;
            isFormValid = false;
        }
        else if(validationObject[`${key}`].minlength && data[`${key}`] && data[`${key}`].length < validationObject[`${key}`].minlength){
            validationObject[`${key}`].isvalid = false;
            isFormValid = false;
        }
        else{
            validationObject[`${key}`].isvalid = true;
        }
    })

    return [validationObject, isFormValid];

}