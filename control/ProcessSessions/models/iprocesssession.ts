export interface IProcessSession {
    type: ProcessSessionType
    id: string
    name: string
    startedOn: string
    completedOn: string
    state: string
    status: string
}

export enum ProcessSessionType {
    BackgroundWorkflow = 'BackgroundWorkflow',
    RealtimeWorkflow = 'RealtimeWorkflow',
}