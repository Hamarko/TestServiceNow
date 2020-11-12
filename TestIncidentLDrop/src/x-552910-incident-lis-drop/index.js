import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import view from './view';
import incidentsActions from './action'
import styles from './styles.scss';

createCustomElement('x-552910-incident-lis-drop', {
	...incidentsActions,
	renderer: {type: snabbdom},
	view,	
	styles
});
