export const FormID = process.env.REACT_APP_FWX_FORM;// || 'pdf';
console.log('GLOBAL FormID', FormID, {E:process.env});

export const AppID = name => FormID+'-'+name;