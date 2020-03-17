import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import TodoListContainer from './components/TodoList/TodoList.Container';

import reducers, { namespace } from './states';
import {View} from "@twilio/flex-ui";
import CustomView from "./CustomView";
import CustomSideBarButton from "./CustomSidebarButton";
import CustomThemeOverrides from './CustomThemeOverrides';
import Axios from 'axios';

const PLUGIN_NAME = 'AddCustomViewPlugin';

export default class AddCustomViewPlugin extends FlexPlugin {
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
        flex.SideNav.Content.add(
            <CustomSideBarButton key="custom-view-button" />
        );

        flex.ViewCollection.Content.add(
            <View name="custom-view" key="custom-view">
                <CustomView />
            </View>
        );
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