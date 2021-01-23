import { IInputs } from "../generated/ManifestTypes";
import { IWorkflowService } from "./";
import { IProcessSession, ProcessSessionType } from '../models';
import { ResourceStrings } from "../strings/resourcestrings";

export class RealTimeWorkflowService implements IWorkflowService {

    public title: string;

    constructor(
        private entityTypeName: string,
        private entityId: string,
        private context: ComponentFramework.Context<IInputs>,
        resourceStrings: ResourceStrings
    ) {
        this.title = resourceStrings.RealTimeWorkflows;
    }

    public openPopUpWindow(item: IProcessSession): void {
        const url = window.location.origin + 
            `/sfa/workflowsession/edit.aspx?id={${item.id}}&_CreateFromType=2&_CreateFromId=%7b25A45522-80B4-EA11-A812-000D3A26D722%7d`;

        window.open(url, '_blank');
    }

    async getSessions(): Promise<IProcessSession[]> {
        const options = `?$filter=_regardingobjectid_value eq '${this.entityId}'&$orderby=createdon desc`;
        const { entities } = await this.context.webAPI.retrieveMultipleRecords('processsession', options);

        return entities
            .filter(entity => entity['_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname'] === this.entityTypeName)
            .map(entity => ({
                type: ProcessSessionType.RealtimeWorkflow,
                id: entity['processsessionid'],
                name: entity['_processid_value@OData.Community.Display.V1.FormattedValue'],
                startedOn: entity['startedon@OData.Community.Display.V1.FormattedValue'] || '',
                completedOn: entity['completedon@OData.Community.Display.V1.FormattedValue'] || '',
                state: entity['statecode@OData.Community.Display.V1.FormattedValue'] || '',
                status: entity['statuscode@OData.Community.Display.V1.FormattedValue'] || '',
            }));
    }

}