import { AppID } from './globals';
import { fyneApp } from './helpers/hubster';
import { ThisHub } from './hub';

export const script = "inline.js";
export const app_id = AppID('inline');
export const ele_id = AppID('inline');
export const className = AppID('inline');

// this is to be moved inside hubster at some point
let isBound = false;

export const config = fyneApp({app_id,ele_id,script});

export const render = ({element,data,loader=true,...props}) => {
    //console.log("INLINE render", {element,data,props});
    
    const div = element || document.getElementById(ele_id);
    if(!div){
        return console.warn("Can't reneder inline, root element not found", {app_id, ele_id});
    }

    if(!isBound){
        ThisHub.bind([app_id]);
        isBound = true;
    }

    const random = (length = 10, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')=> {
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    //console.log('HUB INLINE render', data, this, {app_id, ele_id, config, div});
    ThisHub.render([{
        id: app_id,
        ref: random(),
        props: {
            data,
            destroy: (args) => {
                //console.log('Hub destroy', args);
                Hub.destroy([app_id]);
            }
        },
        loader: loader,
        element: div /*{
          node: div, //selector: '#'+ele_id,
          shadow: false // material ui dialog cannot be in shadow dom
          // this solution doesn't work https://stackoverflow.com/questions/51832583/react-components-material-ui-theme-not-scoped-locally-to-shadow-dom
          // reasons described here https://github.com/mui-org/material-ui/issues/16223
        }*/,
        onRender: args => {
            //console.log('HUB INLINE rendered', args);
        }
    }]);
}