import { IInputs, IOutputs } from './generated/ManifestTypes'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App, IAppProps } from './components'
import { IWorkflowService, BackgroundWorkflowService, RealTimeWorkflowService } from './services'
import { ResourceStrings } from './strings/resourcestrings'

export class ProcessSessions implements ComponentFramework.StandardControl<IInputs, IOutputs> {

    private context: ComponentFramework.Context<IInputs>
    private container: HTMLDivElement
    private entityId: string
    private entityTypeName: string
    private resourceStrings: ResourceStrings

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this.context = context
        this.container = container
        this.assignEntityReference(context)
        this.resourceStrings = new ResourceStrings(context)
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        this.assignEntityReference(context)
        this.render()
    }

    public destroy(): void {
        ReactDOM.unmountComponentAtNode(this.container)
    }

    private render(): void {
        const props: IAppProps = {
            entityId: this.entityId,
            workflowService: this.getWorkflowService(this.context),
            resourceStrings: this.resourceStrings,
        }

        ReactDOM.render(
            React.createElement(App, props),
            this.container
        )
    }

    private assignEntityReference(context: ComponentFramework.Context<IInputs>): void {
        this.entityId = context.parameters.entityId?.raw!
        this.entityTypeName = context.parameters.entityLogicalName?.raw!
    }

    private getWorkflowService(context: ComponentFramework.Context<IInputs>): IWorkflowService {
        const processType = context.parameters.processType.raw

        if (processType === 'BackgroundWorkflows') {
            return new BackgroundWorkflowService(this.entityTypeName, this.entityId, context, this.resourceStrings)
        }

        return new RealTimeWorkflowService(this.entityTypeName, this.entityId, context, this.resourceStrings)
    }
}