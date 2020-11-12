import "@servicenow/now-template-card";

export default (state, {updateState}) => {
    const {result} = state;
    console.log(result)
    if (result) {
        return (
            <div className="wrapper">
				<h1>Incident</h1>
                {result.map( d => (				
                    <now-template-card-assist 
                        tagline={{"icon":"tree-view-long-outline","label":"Incident"}}
                        actions={[{"id":"share","label":"Open Record"},
                                {"id":"close","label":"Delete"}]}
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
			</div>		
        );
    }
}
