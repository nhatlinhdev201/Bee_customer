import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, CheckBox, Icon, Layout } from '@ui-kitten/components';
import LayoutGradientBlue from '../components/layouts/LayoutGradientBlue';
import HeaderChat from './HeaderChat';
import Box from '../components/Box';
import { SCREEN_HEIGHT } from '../styles/MainStyle';

// Component TodoListScreen
const TodoListScreen = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');

    useEffect(() => {
        const loadTodos = async () => {
            try {
                const storedTodos = await AsyncStorage.getItem('todos');
                if (storedTodos) {
                    setTodos(JSON.parse(storedTodos));
                } else {
                    const defaultTodo = {
                        id: '1',
                        title: 'Học tiếng Anh',
                        completed: false,
                        timestamp: new Date().toISOString(),
                    };
                    const initialTodos = [defaultTodo];
                    setTodos(initialTodos);
                    await AsyncStorage.setItem('todos', JSON.stringify(initialTodos));
                }
            } catch (error) {
                console.error('Failed to load todos', error);
            }
        };

        loadTodos();
    }, []);

    const addTodo = async () => {
        if (newTodo.trim() === '') return;

        const newTodoItem = {
            id: Date.now().toString(),
            title: newTodo,
            completed: false,
            timestamp: new Date().toISOString(),
        };

        const updatedTodos = [...todos, newTodoItem];
        setTodos(updatedTodos);
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
        setNewTodo('');
    };

    const toggleTodoCompletion = async (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updatedTodos);
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const removeTodo = async (id) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
        await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    };

    const renderTodoItem = ({ item }) => (
        <View style={styles.todoContainer}>
            <CheckBox
                checked={item.completed}
                onChange={() => toggleTodoCompletion(item.id)}
                style={styles.checkbox}
            />
            <View style={styles.todoTextContainer}>
                <Text style={item.completed ? styles.completedTodo : styles.todo}>
                    {item.title}
                </Text>
                <Text style={styles.timestamp}>
                    {new Date(item.timestamp).toLocaleString()}
                </Text>
            </View>
            <TouchableOpacity onPress={() => removeTodo(item.id)}>
                <Icon name='trash-2' style={styles.removeIcon} fill='#FF3D71' />
            </TouchableOpacity>
        </View>
    );

    const incompleteTodos = todos.filter(todo => !todo.completed);
    const completedTodos = todos.filter(todo => todo.completed);

    return (
        <LayoutGradientBlue>
            <HeaderChat title="Danh sách công việc" isVisibleBack={false} />
            <View style={styles.container}>
                <View style={styles.fixedHeader}>
                    <TextInput
                        style={styles.input}
                        value={newTodo}
                        onChangeText={setNewTodo}
                        placeholder="Nhập công việc..."
                    />
                    <Button style={styles.addButton} onPress={addTodo}>
                        Thêm công việc
                    </Button>
                </View>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <Text style={styles.heading}>Đang làm</Text>
                    <FlatList
                        data={incompleteTodos}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTodoItem}
                        ListEmptyComponent={<Text style={styles.emptyText}>No todos found</Text>}
                    />
                    <Text style={styles.heading}>Đã hoàn thành</Text>
                    <FlatList
                        data={completedTodos}
                        keyExtractor={(item) => item.id}
                        renderItem={renderTodoItem}
                        ListEmptyComponent={<Text style={styles.emptyText}>No todos found</Text>}
                    />
                    <Box height={SCREEN_HEIGHT * 0.07} />
                </ScrollView>
            </View>
        </LayoutGradientBlue>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    fixedHeader: {
        padding: 20,
        backgroundColor: '#F7F9FC',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    input: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    addButton: {
        marginBottom: 20,
    },
    scrollViewContent: {
        padding: 20,
    },
    todoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
    },
    checkbox: {
        marginRight: 10,
    },
    todoTextContainer: {
        flex: 1,
    },
    todo: {
        fontSize: 16,
    },
    completedTodo: {
        fontSize: 16,
        textDecorationLine: 'line-through',
        color: '#888',
    },
    timestamp: {
        fontSize: 12,
        color: '#888',
    },
    removeIcon: {
        width: 24,
        height: 24,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    emptyText: {
        textAlign: 'center',
        color: '#888',
    },
});

export default TodoListScreen;
