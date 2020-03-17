// import React from 'react';
// import { VERSION } from '@twilio/flex-ui';
// import { FlexPlugin } from 'flex-plugin';

// import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
// import reducers, { namespace } from './states';
// import CustomThemeOverrides from './CustomThemeOverrides';

// // const PLUGIN_NAME = 'SamplePlugin';
// const PLUGIN_NAME = 'GettingStartedPlugin';

// export default class GettingStartedPlugin extends FlexPlugin {
//   constructor() {
//     super(PLUGIN_NAME);
//   }

//   /**
//    * This code is run when your plugin is being started
//    * Use this to modify any UI components or attach to the actions framework
//    *
//    * @param flex { typeof import('@twilio/flex-ui') }
//    * @param manager { import('@twilio/flex-ui').Manager }
//    */
//   init(flex, manager) {
//     this.registerReducers(manager);

//     flex.CRMContainer.defaultProps.uriCallback = (task) => {
//       return task 
//         ? `https://bing.com/?q=${task.attributes.name}`
//         : 'https://bing.com';
//     }
//   }

//   /**
//    * Registers the plugin reducers
//    *
//    * @param manager { Flex.Manager }
//    */
//   registerReducers(manager) {
//     this.registerReducers(manager);

//     const options = { sortOrder: -1 };
//     flex.AgentDesktopView
//       .Panel1
//       .Content
//       .add(<CustomTaskListContainer key="demo-component" />, options);
//     // if (!manager.store.addReducer) {
//     //   // eslint: disable-next-line
//     //   console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
//     //   return;
//     // }

//     // manager.store.addReducer(namespace, reducers);
//   }
// }

import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import TodoListContainer from './components/TodoList/TodoList.Container';

import reducers, { namespace } from './states';
import { Tab } from "@twilio/flex-ui";

import CustomThemeOverrides from './CustomThemeOverrides';

const PLUGIN_NAME = 'GettingStartedPlugin';

export default class GettingStartedPlugin extends FlexPlugin {
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
    this.registerReducers(manager);

    const options = { sortOrder: -1 };
    const optionsBottom = { sortOrder: -1 };
    manager.strings.NoTasks = "No task, make some coffee";

    flex.AgentDesktopView
      .defaultProps
      .showPanel2 = false;

    flex.CRMContainer.defaultProps.uriCallback = (task) => {
      return task
          ? `https://bing.com/?q=${task.attributes.name}`
          : 'https://bing.com';
    };

    flex.AgentDesktopView
      .Panel1
      .Content
      .add(<CustomTaskListContainer key="demo-component" />, options);

    flex.TaskInfoPanel
        .Content
        .add(<TodoListContainer key="todo-component" />, options);

    const Img = <img src="https://previews.123rf.com/images/dualororua/dualororua1704/dualororua170400027/75374193-cartoon-emoticon-smiley-face-waving-hello.jpg" />;

    flex.TaskCanvasTabs.Content.add(
        <Tab icon={Img} iconActive={Img} key="my-new-tab">
          <TodoListContainer/>
        </Tab>
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
