import "@servicenow/now-template-card";
import "@servicenow/now-modal";
import "@servicenow/now-input";
export default (state, {updateState}) => {
    const {result,opened = 'false',id} = state;
    const modalContent = [['','']]      
    if(opened === true){
       console.log(result, id)
       const card = result.find( e => (e.sys_id === id)? true : false);
       const modalInstance = [["Incident",card.short_description],
                              ["Nuber",card.number], 
                              ["State",card.state],
                              ["Assignment group", card.assignment_group.display_value],
                              ["Assigned to","value",card.assigned_to.display_value]];
       modalContent.pop();
       modalInstance.forEach(e => modalContent.push(e));  
       console.log(modalContent) 
       
    } 
    if (result) {
        return (                                           
            <div className="wrapper">                                                          
				<h1>Incident</h1>                                                                         
                {result.map( d => (				
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
                     footerActions={[{"label":"Delete","variant":"primary-negative"}]}>
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
