import { actionTypes} from '@servicenow/ui-core';
import { createHttpEffect } from '@servicenow/ui-effect-http';
const {COMPONENT_BOOTSTRAPPED} = actionTypes;
function deletedIncident (id, updateState, dispatch, state){
	updateState({
		result: state.result.filter(incident=>incident.sys_id !== id)
	});				
	dispatch('DELETED_INCIDENT', {id})
}
export default {
    actionHandlers: {
        [COMPONENT_BOOTSTRAPPED]: (coeffects) => {
			const { dispatch } = coeffects;				
			dispatch('FETCH_INCIDENT', {
				sysparm_display_value:'true'
			});
		},
		'NOW_DROPDOWN_PANEL#ITEM_CLICKED':	(coeffects) =>{
			const { action, updateState, dispatch, state} = coeffects;								
			const id = action.payload.item.id.split(' ')[0];
			const button = action.payload.item.id.split(' ')[1];
			const name = action.payload.item.label	
			const idName = action.payload.item.id			
			if(button === "Open_Record"){
				const opened = true;
			    updateState({id, opened});
			} else if(button === "Delete") {								
				deletedIncident (id, updateState, dispatch, state)
			} else if (idName.split(' ')[0]==='Assigned'){				
				updateState({name,idName})
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
		'ERROR': (coeffects) => {			
			const { action } = coeffects
			console.log( "Error:",action.payload, coeffects )
		},
		'DELETED_INCIDENT': createHttpEffect('api/now/table/incident/:id',{
			method: 'DELETE',
			pathParams: ['id'],			
			errorActionType:"ERROR"
		}),		
		'NOW_MODAL#FOOTER_ACTION_CLICKED':(coeffects) =>{
			const { action, updateState, dispatch, state} = coeffects;
			const { id,label } = action.payload.action
			const opened = false;
			if ( label==='Delete' ){												
				deletedIncident (id, updateState, dispatch, state)
				updateState({opened})
			}
		},
		'NOW_INPUT#INPUT':(coeffects) =>{
			const { action, updateState, dispatch, state} = coeffects
			const { fieldValue } = action.payload;
			updateState ({ fieldValue })
		}

    }

}