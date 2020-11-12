import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import "@servicenow/now-template-card";
import styles from './styles.scss';
const FechData = createHttpEffect('api/now/table/incident', {
	method: 'GET',	
	queryParams: ['sysparm_display_value'],
	successActionType: 'FETCH_LATEST_INCIDENT_SUCCESS'
})
console.log(FechData)
const view = (state, {updateState}) => {	
	const {incidents} = state;		
    if(incidents){
		return (		
			<div className="wrapper">
				<h1>Incident</h1>
				{incidents.map( d => (				
					<now-template-card-assist 
					tagline={{"icon":"tree-view-long-outline","label":"Incident"}}
					actions={[{"id":"share","label":"Copy URL"},
							{"id":"close","label":"Mark Complete"}]}
					heading={{"label":d.short_description}}
					content={[{"label":"Nuber","value":{"type":"string","value":d.number}},
							{"label":"State","value":{"type":"string","value":d.state_}},						  
							{"label":"Assignment group","value":{"type":"string","value":d.assignment_group.display_value}},
							{"label":"Assigned to","value":{"type":"string","value": d.assigned_to.display_value}}						  
							]}
					contentItemMinWidth="400"
					footerContent={{"label":"Updated","value":d.sys_updated_on}}
					configAria={{}}/>
				))}				 		
			</div>
		);
	}else{return (<div className="wrapper">	<h1>Incident</h1></div>)}

};

createCustomElement('x-552910-incident-list', {	
	actionHandlers: {
		[COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;		
			dispatch('FETCH_LATEST_INCIDENT', {
				sysparm_display_value:'true'
			});
		},
		'FETCH_LATEST_INCIDENT': FechData,
		'FETCH_LATEST_INCIDENT_SUCCESS': (coeffects) => {			
			const { action, updateState } = coeffects;
			const { result } = action.payload;			
			const incidents = []
			console.log(result)
			result.map(incident => {				
				let {  short_description, number,assignment_group, assigned_to,sys_updated_on  } = incident
				let state_ = incident.state
				incidents.push({ short_description, number, state_, assignment_group, assigned_to,sys_updated_on })
			})					
			updateState({incidents});
		}

	},
	renderer: {type: snabbdom},
	view,	
	styles
});
