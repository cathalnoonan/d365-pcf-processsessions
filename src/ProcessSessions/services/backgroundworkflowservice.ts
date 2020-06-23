import { IWorkflowService } from "./";
import { IInputs } from "../generated/ManifestTypes";
import { IProcessSession, ProcessSessionType } from '../models';
import { ResourceStrings } from "../strings/resourcestrings";

export default class BackgroundWorkflowService implements IWorkflowService {

    public title: string;

    constructor(
        private entityTypeName: string,
        private entityId: string,
        private context: ComponentFramework.Context<IInputs>,
        private resourceStrings: ResourceStrings
    ) {
        this.title = resourceStrings.BackgroundWorkflows;
    }

    async getSessions(): Promise<IProcessSession[]> {
        const options = `?$filter=_regardingobjectid_value eq '${this.entityId}'`;
        const { entities } = await this.context.webAPI.retrieveMultipleRecords('asyncoperation', options);

        return entities
            .filter(entity => entity['_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname'] === this.entityTypeName)
            .map(entity => {
                return {
                    type: ProcessSessionType.BackgroundWorkflow,
                    id: entity['asyncoperationid'],
                    comments: '',
                    name: entity['name'],
                    completedOn: entity['completedon'],
                    startedOn: entity['startedon'],
                    processId: entity['_workflowactivationid_value'],
                    processName: entity['_workflowactivationid_value@OData.Community.Display.V1.FormattedValue'],
                }
            });
    }

}