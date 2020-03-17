import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import TodoListContainer from './components/TodoList/TodoList.Container';

import reducers, { namespace } from './states';
import { Tab } from "@twilio/flex-ui";

import CustomThemeOverrides from './CustomThemeOverrides';
import Axios from 'axios';

const PLUGIN_NAME = 'ActionsPlugin';

export default class ActionsPlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof import('@twilio/flex-ui') }
     * @param manager { import('@twilio/flex-ui').Manager }
     */
    init(flex, manager) {
        // flex.Actions.addListener("afterAcceptTask", payload => {
        //     alert("Triggered after accepted task alarm");
        //     console.log("payload")
        //     console.log(payload);
        // });

        flex.Actions.addListener("beforeAcceptTask", (payload, abortFunction) => {
            if (!window.confirm("Are you sure u want 2 accept the task?")) {
                abortFunction();
            }
        });

        flex.Actions.registerAction("MyAction", payload => {
            console.info("my action invoked thanh");
            return Axios.get("https://quotes.rest/qod.json?category=inspire")
                .then(response => {
                    console.log("some quotes thanh");
                    alert("Inspriation asdlkjadsf " + response.data.contents.quotes[0].quote);
                })
                .catch(error => {
                    console.log(error);
                    throw error;
                })
        });

        flex.Actions.addListener("afterCompleteTask", (payload) => {return flex.Actions.invokeAction("MyAction")});
    }

    /**
     * Registers the plugin reducers
     *
     * @param manager { Flex.Manager }
     */
    registerReducers(manager) {
        if (!manager.store.addReducer) {
            // eslint: disable-next-line
            console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
            return;
        }

        manager.store.addReducer(namespace, reducers);
    }
}
