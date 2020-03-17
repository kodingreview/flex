import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Actions } from '../../states/TodoListState';
import TodoList from './TodoList';

const mapStateToProps = (state) => ({
    isOpen: state['getting-started'].todoList.isOpen,
});

const mapDispatchToProps = (dispatch) => ({
  dismissBar: bindActionCreators(Actions.dismissBar, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
