export class UserCredentials{
	public api_endpoint_url : string;
	public apikey: string;
	public client_id: string;
	public client_secret: string;
	public iam_apikey_description: string;
	public iam_apikey_name: string;
	public iam_role_crn: string;
	public iam_serviceid_crn: string;

	constructor(credentialObj : string){
		var c = JSON.parse(credentialObj);
		
		this.api_endpoint_url = c.api_endpoint_url;
		this.apikey = c.apikey;
		this.client_id = c.client_id;
		this.client_secret = c.client_secret;
		this.iam_apikey_description = c.iam_apikey_description;
		this.iam_role_crn = c.iam_role_crn;
		this.iam_serviceid_crn = c.iam_serviceid_crn;
	}
}

	