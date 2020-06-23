import { IProcessSession } from "../models";

export default interface IWorkflowService {
    title: string;
    getSessions: () => Promise<IProcessSession[]>
}