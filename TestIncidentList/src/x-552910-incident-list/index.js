import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import "@servicenow/now-template-card";
import styles from './styles.scss';
const view = (state, {updateState}) => {
	console.log(state)
	const {short_description, number, state_, assignment_group, assigned_to,updated_on} = state;	
	console.log(state)
	return (		
		<div className="wrapper">
			<h1>Card</h1>
			{data.map( d => (
				<now-template-card-assist 
				tagline={{"icon":"tree-view-long-outline","label":"Process"}}
				actions={[{"id":"share","label":"Copy URL"},
						  {"id":"close","label":"Mark Complete"}]}
				heading={short_description}
				content={[number, state_, assignment_group, assigned_to]}
				contentItemMinWidth="300"
				footerContent={updated_on}
				configAria={{}}/>
			))}				 		
		</div>
	);
};

createCustomElement('x-552910-incident-list', {
	renderer: {type: snabbdom},
	view,
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;
		
			dispatch('FETCH_LATEST_INCIDENT', {
				sysparm_limit: '1',
				sysparm_query: 'ORDERBYDESCnumber'
			});
		},
		'FETCH_LATEST_INCIDENT': createHttpEffect('api/now/table/incident', {
			method: 'GET',
			queryParams: ['sysparm_limit','sysparm_query'],
			successActionType: 'FETCH_LATEST_INCIDENT_SUCCESS'
		}),
		'FETCH_LATEST_INCIDENT_SUCCESS': (coeffects) => {
			const { action, updateState } = coeffects;
			const { result } = action.payload;
			const {  short_description, number, state_, assignment_group, assigned_to,updated_on  } = result[0];
					
			updateState({ short_description, number, state_, assignment_group, assigned_to,updated_on });
		}

	},	
	styles
});
