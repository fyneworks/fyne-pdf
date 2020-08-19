import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider, responsiveFontSizes } from '@material-ui/core/styles';

import { StylesProvider, jssPreset } from '@material-ui/styles';
import { create } from 'jss';

import './index.scss';

import { SnackbarProvider } from '@fyne/ui/notify'; //https://material-ui.com/components/snackbars/
//console.log('SnackbarProvider', {SnackbarProvider});


const theme = responsiveFontSizes(createMuiTheme({
    typography: {
        // SEE https://material-ui.com/customization/typography/
        // fontSize: '16px',
        //htmlFontSize: 10,
    },
    status: {
      danger: '#900',
    },
}));


export const App = ({ 
    FyneApp, 
    onRender,
    element,
    ...props
}) => {

    const jss = create({
        ...jssPreset(),
        //insertionPoint: element
    });

    console.log("App really render()", {FyneApp, onRender, element, jss, props, StylesProvider,ThemeProvider,SnackbarProvider,FyneApp});
    
    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider preventDuplicate maxSnack={3}>
                        <FyneApp {...props}/>
                    </SnackbarProvider>
                </ThemeProvider>
            </StylesProvider>
        </React.Fragment>
    )
    
}

export const destroy = ({ onDestroy = () => {}, element, ...props } = {}) => {
    //console.log("Fyne form destroy", {onDestroy, element, props});
	element && ReactDOM.unmountComponentAtNode(element)
	onDestroy()
}

export const render = ({ FyneApp = React.Fragment, onRender = () => {}, element, ...props } = {}) => {

    const { data = {}, trigger, ...moprops } = props?.props?.data || {};
    const trgdata = trigger ? { ...trigger.dataset } : {};
    const eledata = element ? { ...element.dataset } : {};
    const options = Object.assign({}, moprops, trgdata, eledata );
    console.log("App render()", { trigger, /*td:trigger.dataset,*/ trgdata, element, /*ed:element.dataset,*/ eledata, data, options, moprops, props });

    ReactDOM.render(
        <App
            FyneApp={FyneApp}
            onRender={onRender}
            element={element}
            trigger={trigger}
            options={options}
            data={data}
            {...props}
        >
            Hello world
        </App>
    , element, onRender)
    
};




