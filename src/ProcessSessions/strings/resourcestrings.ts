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
        return this.getString('Refresh');
    }
    get Name(): string {
        return this.getString('Name');
    }
    get State(): string {
        return this.getString('State');
    }
    get Status(): string {
        return this.getString('Status');
    }
    get StartedOn(): string {
        return this.getString('StartedOn');
    }
    get CompletedOn(): string {
        return this.getString('CompletedOn');
    }

    private getString(key: string): string {
        return this.context.resources.getString(key);
    }
}

export default function createResourceStrings(context: ComponentFramework.Context<IInputs>) : ResourceStrings {
    return new ResourceStrings(context);
}