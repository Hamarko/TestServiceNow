import { actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
export default {
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;	
			console.log('Work')	
			dispatch('FETCH_INCIDENT', {
				sysparm_display_value:'true'
			});
		},
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED':	(coeffects) =>{
			const { action, updateState, dispatch, state} = coeffects;
			console.log(action.payload)				
			const id = action.payload.item.id.split(' ')[0];
			const button = action.payload.item.id.split(' ')[1];
			console.log(button)			
			if(button === "Open_Record"){
				const opened = true;
			    updateState({id, opened});
			} else if(button === "Delete") {
				console.log(button,id)				
				updateState({
					result: state.result.filter(incident=>incident.sys_id !== id)
				});
				dispatch('DELETED_INCIDENT', {id})
			}			
		},
		'NOW_MODAL#OPENED_SET': (coeffects) => {
			const { action, updateState } = coeffects;
			const opened = action.payload.value
			updateState({opened})
		},
        'FETCH_INCIDENT': createHttpEffect('api/now/table/incident', {
			method: 'GET',	
			queryParams: ['sysparm_display_value'],
			successActionType: 'FETCH_INCIDENT_SUCCESS',
			errorActionType:"ERROR"
		}),
        'FETCH_INCIDENT_SUCCESS': (coeffects) => {						
			const { action, updateState } = coeffects;			
			const { result } = action.payload;					
			updateState({result});
		},
		'ERROR': (error) => (coeffects) => {
			const { action } = coeffects
			console.log( action, coeffects )
		},
		'DELETED_INCIDENT': createHttpEffect('api/now/table/incident/:',{
			method: 'DELETE',
			pathParams: ['id'],
			errorActionType:"ERROR"
		})

    }

}