import { IWorkflowService } from './'
import { IInputs } from '../generated/ManifestTypes'
import { IProcessSession, ProcessSessionType } from '../models'
import { ResourceStrings } from '../strings/resourcestrings'

export class BackgroundWorkflowService implements IWorkflowService {

    public title: string

    constructor(
        private entityTypeName: string,
        private entityId: string,
        private context: ComponentFramework.Context<IInputs>,
        resourceStrings: ResourceStrings
    ) {
        this.title = resourceStrings.BackgroundWorkflows
    }

    public openPopUpWindow(item: IProcessSession): void {
        const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl()
        
        const url = clientUrl +
            `/tools/workflowinstance/edit.aspx?id={${item.id}}&_CreateFromType=2&_CreateFromId=%7b25A45522-80B4-EA11-A812-000D3A26D722%7d`
        
        window.open(url, '_blank')
    }

    async getSessions(): Promise<IProcessSession[]> {
        const options = `?$filter=_regardingobjectid_value eq '${this.entityId}'&$orderby=createdon desc`
        const { entities } = await this.context.webAPI.retrieveMultipleRecords('asyncoperation', options)

        return entities
            .filter(entity => entity['_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname'] === this.entityTypeName)
            .map(entity => ({
                type: ProcessSessionType.BackgroundWorkflow,
                id: entity['asyncoperationid'],
                name: entity['_workflowactivationid_value@OData.Community.Display.V1.FormattedValue'],
                startedOn: entity['startedon@OData.Community.Display.V1.FormattedValue'] || '',
                completedOn: entity['completedon@OData.Community.Display.V1.FormattedValue'] || '',
                state: entity['statecode@OData.Community.Display.V1.FormattedValue'] || '',
                status: entity['statuscode@OData.Community.Display.V1.FormattedValue'] || '',
            }))
            .filter(entity => entity.name !== '')
    }

}