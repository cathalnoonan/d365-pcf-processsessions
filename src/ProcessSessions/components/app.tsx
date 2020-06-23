import * as React from 'react';
import { IWorkflowService } from '../services';
import { IProcessSession } from '../models';

const App = (props: IAppProps) => {

    const [sessions, setSessions] = React.useState<IProcessSession[]>([]);

    React.useEffect(() => {
        (async function () {
            const sessions = await props.workflowService.getSessions();
            debugger;
            setSessions(sessions);
        } ())
    }, []);

    return (
        <div>
            <div>{props.workflowService.title}</div>
            <div>Found {sessions.length} sessions</div>
        </div>
    );
}

interface IAppProps {
    workflowService: IWorkflowService
}

export {
    App,
    IAppProps
}