import * as React from 'react';
import { IWorkflowService } from '../services';
import { IProcessSession } from '../models';
import { ResourceStrings } from '../strings/resourcestrings';

import { DetailsList, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';

interface IAppProps {
    workflowService: IWorkflowService;
    resourceStrings: ResourceStrings;
}

const App = (props: IAppProps) => {

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
                    <Label style={{ lineHeight: '23px' }}>{props.workflowService.title}</Label>
                </div>
                <div>
                    <Button onClick={getProcessSessions}>{props.resourceStrings.Refresh}</Button>
                </div>
            </div>

            <DetailsList
                columns={[
                    { name: props.resourceStrings.Name, key: 'name', fieldName: 'name', minWidth: 150, maxWidth: 300, isResizable: true },
                    { name: props.resourceStrings.State, key: 'state', fieldName: 'state', minWidth: 75, maxWidth: 75, isResizable: false },
                    { name: props.resourceStrings.Status, key: 'status', fieldName: 'status', minWidth: 75, maxWidth: 75, isResizable: false },
                    { name: props.resourceStrings.StartedOn, key: 'startedOn', fieldName: 'startedOn', minWidth: 100, maxWidth: 100, isResizable: false },
                    { name: props.resourceStrings.CompletedOn, key: 'completedOn', fieldName: 'completedOn', minWidth: 100, maxWidth: 100, isResizable: false },
                ]}
                items={sessions}
                onItemInvoked={props.workflowService.openPopUpWindow}
                selectionMode={SelectionMode.none}
            />
        </div>
    );
}

export {
    App,
    IAppProps
}