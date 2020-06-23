import * as React from 'react';
import { IWorkflowService } from '../services';
import { IProcessSession } from '../models';
import { ResourceStrings } from '../strings/resourcestrings';

import { DetailsList, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

interface IAppProps {
    workflowService: IWorkflowService;
    resourceStrings: ResourceStrings;
}

const App = (props: IAppProps) => {

    const { workflowService, resourceStrings } = props;

    const [sessions, setSessions] = React.useState<IProcessSession[]>([]);

    const getProcessSessions = () => {
        props.workflowService.getSessions()
            .then(setSessions);
    }

    React.useEffect(getProcessSessions, []);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <Label style={{ lineHeight: '22px' }}>{workflowService.title}</Label>
                </div>
                <div>
                    <Button onClick={getProcessSessions}>{resourceStrings.Refresh}</Button>
                </div>
            </div>

            <DetailsList
                columns={[
                    createColumn(resourceStrings.Name, 'name', 120),
                    createColumn(resourceStrings.State, 'state', 85),
                    createColumn(resourceStrings.Status, 'status', 85),
                    createColumn(resourceStrings.StartedOn, 'startedOn', 105),
                    createColumn(resourceStrings.CompletedOn, 'completedOn', 105),
                ]}
                items={sessions}
                onItemInvoked={workflowService.openPopUpWindow}
                selectionMode={SelectionMode.none}
            />

        </div>
    );
}

function createColumn(label: string, valueFieldName: string, minWidth: number): IColumn {
    return { 
        name: label,
        key: valueFieldName,
        fieldName: valueFieldName,
        minWidth,
        isResizable: true, 
    }
}

export {
    App,
    IAppProps
}