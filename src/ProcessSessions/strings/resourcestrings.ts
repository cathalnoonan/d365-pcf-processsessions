import { IInputs } from "../generated/ManifestTypes";

export class ResourceStrings {
    constructor (
        private context: ComponentFramework.Context<IInputs>
    ) {
    }

    get BackgroundWorkflows(): string {
        return this.getString('ProcessType_BackgroundWorkflows_Display_Key');
    }
    get RealTimeWorkflows(): string {
        return this.getString('ProcessType_RealTimeWorkflows_Display_Key');
    }
    get Refresh(): string {
        return this.getString('Refresh_Key');
    }
    get Name(): string {
        return this.getString('Name_Key');
    }
    get State(): string {
        return this.getString('State_Key');
    }
    get Status(): string {
        return this.getString('Status_Key');
    }
    get StartedOn(): string {
        return this.getString('StartedOn_Key');
    }
    get CompletedOn(): string {
        return this.getString('CompletedOn_Key');
    }

    private getString(key: string): string {
        return this.context.resources.getString(key);
    }
}
