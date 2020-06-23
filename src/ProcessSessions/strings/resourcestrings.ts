import { IInputs } from "../generated/ManifestTypes";

export class ResourceStrings {
    constructor (
        private context: ComponentFramework.Context<IInputs>
    ) {
    }

    get BackgroundWorkflows() {
        return this.getString('ProcessType_BackgroundWorkflows_Display_Key');
    }

    get RealTimeWorkflows() {
        return this.getString('ProcessType_RealTimeWorkflows_Display_Key');
    }

    private getString(key: string): string {
        return this.context.resources.getString(key);
    }
}

export default function createResourceStrings(context: ComponentFramework.Context<IInputs>) : ResourceStrings {
    return new ResourceStrings(context);
}