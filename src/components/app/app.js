import React, {Component}  from 'react';

import AppHeader from "../app-header";
import SearchPanel from "../search-panel";
import ItemStatusFilter from "../item-status-filter";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import './app.css';

export default class App extends Component
{

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Build React App'),
            this.createTodoItem('Finish part 3'),
        ]
    };

    createTodoItem(label) {
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);
            const newData = [
                ...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)
            ];
            return {
                todoData: newData
            };
        });
    }

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(( {todoData}) => {
            const newData = [
                ...todoData,
                newItem
            ];
            return {
                todoData: newData
            };
        })
    }

    onToggleImportant = (id) => {
        this.setState(( {todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
        });
        console.log('onToggleImportant', id);
    }

    onToggleDone = (id) => {
        console.log('onToggleDone', id);
    }

    render() {
        return (
            <div className="todo-app">
                <AppHeader toDo={1} done={3} />
                <div className="top-panel d-flex">
                    <SearchPanel />
                    <ItemStatusFilter />
                </div>

                <TodoList
                    todos={this.state.todoData}
                    onDeleted = {this.deleteItem}
                    onToggleImportant = {this.onToggleImportant}
                    onToggleDone = {this.onToggleDone}
                />

                <ItemAddForm
                    onItemAdded = {this.addItem}
                />
            </div>
        );
    }
};