import { IInputs, IOutputs } from './generated/ManifestTypes';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { App, IAppProps } from './components';
import { IWorkflowService, BackgroundWorkflowService, RealTimeWorkflowService } from './services';
import createResourceStrings from './strings/resourcestrings';

export class ProcessSessions implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private container: HTMLDivElement;
    private entityId: string;
    private entityTypeName: string;

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.container = container;
        this.assignEntityReference(context);
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.assignEntityReference(context);

        const props: IAppProps = {
            workflowService: this.getWorkflowService(context),
        };

        ReactDOM.render(
            React.createElement(App, props),
            this.container
        );
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container);
    }

    private assignEntityReference(context: ComponentFramework.Context<IInputs>): void {
        const { entityId, entityTypeName } = (<any>context).page;
        this.entityId = entityId;
        this.entityTypeName = entityTypeName;
    }

    private getWorkflowService(context: ComponentFramework.Context<IInputs>): IWorkflowService {
        const processType = context.parameters.processType.raw

        const resourceStrings = createResourceStrings(context);

        if (processType === "BackgroundWorkflows") {
            return new BackgroundWorkflowService(this.entityTypeName, this.entityId, context, resourceStrings);
        }

        return new RealTimeWorkflowService(this.entityTypeName, this.entityId, context, resourceStrings);
    }

}