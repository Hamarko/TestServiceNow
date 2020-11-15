import "@servicenow/now-template-card";
import "@servicenow/now-modal";
import "@servicenow/now-input";
export default (state, {updateState}) => {
    const {result,opened = 'false',id,fieldValue = null,name = 'All',idName = 'Assigned 0'} = state;    
    const modalContent = [['','']]
    let uniAssigned = []
    const dropdownItems = [{id:'Assigned 0',label:'All'}]
    let i = 0
    console.log("name",name)    
    console.log('fil',fieldValue)    
    function filterIncident(incident){
        if (fieldValue !== null && name === "All"){
            return incident.short_description.includes(fieldValue)
        } else if(fieldValue !== null && name !== "All"){
            if (incident.assigned_to.display_value !== undefined && name !== 'Empty field') {
                return incident.short_description.includes(fieldValue) && incident.assigned_to.display_value.includes(name)
            }
            if (incident.assigned_to.display_value === undefined && name !== 'Empty field'
            || incident.assigned_to.display_value !== undefined && name === 'Empty field') return false
            if (incident.assigned_to.display_value === undefined && name === 'Empty field'){
                return incident.short_description.includes(fieldValue) 
            }
        } else if (fieldValue === null && name !== "All"){
            if (incident.assigned_to.display_value !== undefined && name !== 'Empty field') {   
                console.log(name,incident.assigned_to.display_value.includes(name))         
                return incident.assigned_to.display_value.includes(name)
            }
            if (incident.assigned_to.display_value === undefined && name !== 'Empty field'
             || incident.assigned_to.display_value !== undefined && name === 'Empty field') return false
        }
        return true
    }    
    if(opened === true){      
       const card = result.find( e => (e.sys_id === id)? true : false);
       const modalInstance = [["Incident",card.short_description],
                              ["Nuber",card.number], 
                              ["State",card.state],
                              ["Assignment group", card.assignment_group.display_value],
                              ["Assigned to","value",card.assigned_to.display_value]];
       modalContent.pop();
       modalInstance.forEach(e => modalContent.push(e));  
       console.log(modalContent) 
       
    }; 
    if (result) {
        result.forEach(incident => {            
            if (!uniAssigned.includes(incident.assigned_to.display_value)){
                uniAssigned.push(incident.assigned_to.display_value)
                ++i
                if(incident.assigned_to.display_value!==""&&incident.assigned_to.display_value!==undefined){                                     
                    dropdownItems.push({id:'Assigned '+i,label:incident.assigned_to.display_value})
                }else{                    
                    dropdownItems.push({id:'Assigned '+i,label:'Empty field'})                    
                }    
            }
        })
        return (                                           
            <div className="wrapper">                                                          
				<h1>Incident</h1> 
                <div className="input">
                    <now-input label='Incident search' step="any" type="text" value=''/>
                    <div className="assignedTo">
                        <p>Assigned to:</p>
                        <now-dropdown items={dropdownItems} selectedItems={[idName]} select="single" variant="secondary" size="md" />
                    </div>
                </div>                                                                        
                {result.filter(filterIncident).map( d => (                    				
                    <now-template-card-assist 
                        tagline={{"icon":"tree-view-long-outline","label":"Incident"}}
                        actions={[{"id":d.sys_id+" Open_Record","label":"Open Record"},
                                {"id":d.sys_id+" Delete","label":"Delete"}]}
                        heading={{"label":d.short_description}}
                        content={[{"label":"Nuber","value":{"type":"string","value":d.number}},
                                {"label":"State","value":{"type":"string","value":d.state}},						  
                                {"label":"Assignment group","value":{"type":"string","value":d.assignment_group.display_value}},
                                {"label":"Assigned to","value":{"type":"string","value": d.assigned_to.display_value}}						  
                                ]}
                        contentItemMinWidth="400"
                        footerContent={{"label":"Updated","value":d.sys_updated_on}}
                        configAria={{}}/>
                ))}
                <now-modal 
                     size="lg" headerLabel="Modal header"
                     opened = {opened}                    
                     footerActions={[{"label":"Delete","variant":"primary-negative",'id':id}]}>
                        <div className="now-input">
                            {modalContent.map(inputProps => 
                            (<now-input label={inputProps[0]}  
                            step="any" type="text" value={inputProps[1]} />))}                            
                        </div>                                                        
                 </now-modal>               				 		
			</div>		
        );
    }
}
