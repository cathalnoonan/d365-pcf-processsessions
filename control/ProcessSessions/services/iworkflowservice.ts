import { IProcessSession } from '../models'

export interface IWorkflowService {
    title: string
    getSessions: () => Promise<IProcessSession[]>
    openPopUpWindow(item: IProcessSession): void
}
