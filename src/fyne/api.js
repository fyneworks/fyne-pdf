import { dialog, inline } from './hub';

export const show = ({...props}) => { 
    const { data } = props;
    //console.log('FYNEFORM > fyne show', {data,props});
    dialog.render(props);
    // render lazy method
    // or open iframe?
}
export const hide = (...args) => { 
    //console.log('FYNEFORM > fyne hide', args)
}


// reusable start procedure
export const start = ({action, custom_data = {}, ...props})=>{

    // tracking
    window.dataLayer && window.dataLayer.push({'event': 'pdf', eventCategory:'start', eventAction:'started'});
    window.ga && window.ga('send', 'event', 'pdf', 'start', 'started');//, [eventLabel], [eventValue], [fieldsObject]);
    
    // auto fill with data provided
    const data = custom_data || ('localStorage' in window) && localStorage.getItem('fynedata');
    if(Object.keys(data).length>0){

        // tracking
        window.dataLayer && window.dataLayer.push({'event': 'pdf', eventCategory:'start', eventAction:'straight-to-form'});
        window.ga && window.ga('send', 'event', 'pdf', 'start', 'straight-to-form');//, [eventLabel], [eventValue], [fieldsObject]);

        // SHOW pdf FOR WITH INITIAL DATA
        //console.log('FYNEFORM > Fyne hub show WITH INITIAL DATA', {data,custom_data});
        show({data});
    }
    else{

        // tracking
        window.dataLayer && window.dataLayer.push({'event': 'pdf', eventCategory:'start', eventAction:'show-prompt'});
        window.ga && window.ga('send', 'event', 'pdf', 'start', 'show-prompt');//, [eventLabel], [eventValue], [fieldsObject]);

        // SHOW pdf FORM BLANK
        //console.log('FYNEFORM > Fyne hub show BLANK', {data,custom_data});
        show();

    }

};

export const renderInto = (ele) => {
	//console.log('FYNEFORM > render into',{ele});
	render({ele});
}

export const render = ({ele,data,...props}) => {
	//console.log('FYNEFORM > render inline',{ele,data,props});
	inline.render({...props,ele,data});//ReactDOM.render(<App url={ele.dataset.pdf} />, ele);
}

let clickedatall = false;
let initialised = false;
let clicked = false;
export const listen = () => {
    //console.log('FYNEFORM > pdf listen');

    // bind event handlers
    if(!!initialised){
        //console.log('FYNEFORM > already initialised, do not bind event handler again');
    }
    else{
        //console.log('FYNEFORM > pdf install click handler', dialog.className);
        
        initialised = true;
        //console.log('FYNEFORM > initializing, bind event handler for the first time');
        document.addEventListener("click", function(e) {
            //console.log('FYNEFORM > pdf click', dialog.className, e);
            
            // reset click once trap
            clicked = false;
            
            // loop through parents to document root, look for .book
            for (var target=e.target; target && target!==this; target=target.parentNode) {
                // loop parent nodes from the target to the delegation node

                //console.log('FYNEFORM > pdf click open dialog?', dialog.className, target);
                
                if (target.matches('[rel="'+dialog.className+'"]') || target.matches('.open-'+dialog.className+'')) {
                    
                    // don't follow the link
                    e.preventDefault();
                        
                    if(!!clicked){
                        //console.log('FYNEFORM > already clicked');
                    }
                    else{
                        clickedatall = true;
                        clicked = true;

                        //console.log('FYNEFORM > show();');
                        show();
    
                    }
                    // stop for-looping
                    break;
                }
            }
        }, false);
    }

    // listen for ALT+B key combo
    document.addEventListener("keyup", function(event) {
        var e = event || window.event; // for IE to cover IEs window event-object
        if(e && e.altKey && e.which === 66) { // ALT+B
            
                    //console.log('FYNEFORM > show();');
                    show();
    
            return false;
        }
    }, false);// keyup

};


// on mutation
export const watch = ()=> {
	const observer = new MutationObserver( mutations => {
        //console.log('FYNEFORM > mutations',{mutations});
        const cls = inline.className;
		const found = [];
		for (const { addedNodes } of mutations) {
			for (const node of addedNodes) {
				if (!node.tagName) continue; // not an element
				if (node.classList.contains(cls)) {
					found.push(node);
				} 
				else if (node.firstElementChild) {
					found.push(...node.getElementsByClassName(cls));
				}
			}
        }
		found.forEach(renderInto);
	});
	observer.observe(document, { childList: true, subtree: true });
};

// bind directly to elements found by class
export const bind = ()=> {
    const cls = inline.className;
    const ele = document.getElementsByClassName(inline.className);
    //console.log('FYNEFORM > bind', {cls,ele});
    // bind all matching elements by class
    [].forEach.call(ele, renderInto);
};

// on boot
export const init = ()=> {

    // bind all matching elements
    bind();
    
    // watch for mutations
    watch();
    
    // listen for clicks
    listen();

};
