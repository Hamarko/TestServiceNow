import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import "@servicenow/now-template-card";
import styles from './styles.scss';
const view = (state, {updateState}) => {
	const {data} = state;	
	return (
		<div className="wrapper">
			<h1>Card</h1>
			{data.map( d => (
				<now-template-card-assist 
				tagline={{"icon":"tree-view-long-outline","label":"Process"}}
				actions={[{"id":"share","label":"Copy URL"},
						  {"id":"close","label":"Mark Complete"}]}
				heading={d.heading}
				content={d.content}
				contentItemMinWidth="300"
				footerContent={d.footerContent}
				configAria={{}}/>
			))}				 		
		</div>
	);
};

createCustomElement('x-552910-card-list', {
	renderer: {type: snabbdom},
	view,
	initialState: {
		data :  [{
			heading : {"label":"Submit attachment to malware sandbox and review the results1"},
			content : [{"label":"State","value":{"type":"string","value":"Closed"}},
						 {"label":"Assigned","value":{"type":"string","value":"Carla S"}},
						 {"label":"Priority","value":{"type":"string","value":"Low"}},
						 {"label":"SLA","value":{"type":"string","value":"No SLA Set"}}],
			footerContent : {"label":"Updated","value":"2019-01-15 08:41:09"}},
			{heading :{"label":"Submit attachment to malware sandbox and review the results2"},
			 content : [{"label":"State","value":{"type":"string","value":"Closed"}},
							 {"label":"Assigned","value":{"type":"string","value":"Carla S"}},
							 {"label":"Priority","value":{"type":"string","value":"Low"}},
							 {"label":"SLA","value":{"type":"string","value":"No SLA Set"}}],
			footerContent : {"label":"Updated","value":"2019-01-15 08:41:09"}},
			{heading : {"label":"Submit attachment to malware sandbox and review the results3"},
			content : [{"label":"State","value":{"type":"string","value":"Closed"}},
								 {"label":"Assigned","value":{"type":"string","value":"Carla S"}},
								 {"label":"Priority","value":{"type":"string","value":"Low"}},
								 {"label":"SLA","value":{"type":"string","value":"No SLA Set"}}],
			footerContent : {"label":"Updated","value":"2019-01-15 08:41:09"}},
			{heading : {"label":"Submit attachment to malware sandbox and review the results4"},
			 content : [{"label":"State","value":{"type":"string","value":"Closed"}},
									 {"label":"Assigned","value":{"type":"string","value":"Carla S"}},
									 {"label":"Priority","value":{"type":"string","value":"Low"}},
									 {"label":"SLA","value":{"type":"string","value":"No SLA Set"}}],
			 footerContent : {"label":"Updated","value":"2019-01-15 08:41:09"}}]
	},
	styles
});
