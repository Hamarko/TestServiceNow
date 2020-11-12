import { actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
const fech = createHttpEffect('api/now/table/incident', {
	method: 'GET',	
	queryParams: ['sysparm_display_value'],
	successActionType: 'FETCH_INCIDENT_SUCCESS',
	errorActionType:"ERROR"
})
console.log(fech)
export default {
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;	
			console.log('Work')	
			dispatch('FETCH_INCIDENT', {
				sysparm_display_value:'true'
			});
		},
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED':(v) =>{
			console.log(v)},
        'FETCH_INCIDENT': fech,
        'FETCH_INCIDENT_SUCCESS': (coeffects) => {						
			const { action, updateState } = coeffects;			
			const { result } = action.payload;					
			updateState({result});
		},
		'ERROR': (error) => console.log(error)

    }

}