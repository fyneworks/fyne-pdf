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
    data, 
    FyneApp, 
    onRender,
    element,
    ...props
}) => {

    const jss = create({
        ...jssPreset(),
        //insertionPoint: element
    });

    //console.log("App", {data, FyneApp, onRender, element, jss, props,StylesProvider,ThemeProvider,SnackbarProvider,FyneApp,});
    
    return (
        <React.Fragment>
            <StylesProvider jss={jss}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider preventDuplicate maxSnack={3}>
                        <FyneApp {...{data, ...props}}/>
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

export const render = ({ data = {}, FyneApp = React.Fragment, onRender = () => {}, trigger, element, ...props } = {}) => {

    const trgdata = trigger ? { ...trigger.dataset } : {};
    const eledata = element ? { ...element.dataset } : {};
    const comdata = Object.assign({}, trgdata, eledata, data );
    console.log("App render()", { trigger, trgdata, element, eledata, data, comdata, props });

    ReactDOM.render(
        <App
            {...(
                { 
                    //data, 
                    FyneApp, 
                    onRender,
                    element,
                    data: comdata,
                    ...props
                }
            )}
        >
            Hello world
        </App>
    , element, onRender)
    
};




