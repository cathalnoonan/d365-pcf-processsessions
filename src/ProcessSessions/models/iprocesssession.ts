export interface IProcessSession {
    type: ProcessSessionType,
    id: string;
    name: string;
    startedOn: string;
    completedOn: string;
    comments: string;

    processId: string;   // _processid_value
    processName: string; // _processid_value@OData.Community.Display.V1.FormattedValue
}

export enum ProcessSessionType {
    BackgroundWorkflow = 'BackgroundWorkflow',
    RealtimeWorkflow = 'RealtimeWorkflow',
}