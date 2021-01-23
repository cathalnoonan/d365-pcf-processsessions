import * as React from 'react';
import { IWorkflowService } from '../services';
import { IProcessSession } from '../models';
import { ResourceStrings } from '../strings/resourcestrings';

import { DetailsList, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

export interface IAppProps {
    entityId: string;
    workflowService: IWorkflowService;
    resourceStrings: ResourceStrings;
}

export const App = (props: IAppProps) => {

    const { entityId, workflowService, resourceStrings } = props;

    // If the record is not created, don't show the table
    if (!entityId) {
        return <div>{resourceStrings.PleaseSaveAndRefresh}</div>;
    }

    const [sessions, setSessions] = React.useState<IProcessSession[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    const getProcessSessions = () => {
        Promise.resolve()
            .then(() => setLoading(true))
            .then(() => workflowService.getSessions())
            .then(sessions => setSessions(sessions))
            .finally(() => setLoading(false));
    };

    React.useEffect(getProcessSessions, []);

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                    <Label style={{ lineHeight: '22px' }}>
                        {workflowService.title}
                    </Label>
                </div>
                <div>
                    <PrimaryButton onClick={getProcessSessions}>
                        {
                            loading
                                ? <Spinner />
                                : resourceStrings.Refresh
                        }
                    </PrimaryButton>
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
