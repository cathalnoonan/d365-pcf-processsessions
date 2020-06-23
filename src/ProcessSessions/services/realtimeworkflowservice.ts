import { IInputs } from "../generated/ManifestTypes";
import { IWorkflowService } from "./";
import { IProcessSession, ProcessSessionType } from '../models';
import { ResourceStrings } from "../strings/resourcestrings";

export default class RealTimeWorkflowService implements IWorkflowService {

    public title: string;

    constructor(
        private entityTypeName: string,
        private entityId: string,
        private context: ComponentFramework.Context<IInputs>,
        private resourceStrings: ResourceStrings
    ) {
        this.title = resourceStrings.RealTimeWorkflows;
    }

    async getSessions(): Promise<IProcessSession[]> {
        const options = `?$filter=_regardingobjectid_value eq '${this.entityId}'`;
        const { entities } = await this.context.webAPI.retrieveMultipleRecords('processsession', options);

        return entities
            .filter(entity => entity['_regardingobjectid_value@Microsoft.Dynamics.CRM.lookuplogicalname'] === this.entityTypeName)
            .map(entity => {
                return {
                    type: ProcessSessionType.RealtimeWorkflow,
                    id: entity['processsessionid'],
                    comments: entity['comments'],
                    name: entity['name'],
                    completedOn: entity['completedon'],
                    startedOn: entity['startedon'],
                    processId: entity['_processid_value'],
                    processName: entity['_processid_value@OData.Community.Display.V1.FormattedValue'],
                }
            });
    }

}