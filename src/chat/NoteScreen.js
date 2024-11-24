import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import {
    Layout,
    Text,
    Card,
    Input,
    Button,
    Icon,
} from '@ui-kitten/components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import LayoutGradientBlue from '../components/layouts/LayoutGradientBlue';
import HeaderChat from './HeaderChat';

const NotesScreen = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        loadNotes();
    }, []);

    const loadNotes = async () => {
        try {
            const storedNotes = await AsyncStorage.getItem('notes');
            if (storedNotes) {
                setNotes(JSON.parse(storedNotes));
            }
        } catch (error) {
            console.error('Failed to load notes:', error);
        }
    };

    const saveNote = async () => {
        if (title.trim() === '' || content.trim() === '') {
            Alert.alert('Vui lòng thêm nội dung');
            return;
        }

        const newNote = {
            id: Date.now().toString(),
            title,
            content,
            timestamp: moment().format('MMMM Do YYYY, h:mm:ss a'),
        };

        const updatedNotes = [newNote, ...notes];
        setNotes(updatedNotes);

        try {
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            console.error('Failed to save note:', error);
        }

        setTitle('');
        setContent('');
    };

    const renderNoteItem = (note) => (
        <Card style={styles.noteCard} key={note.id}>
            <View style={styles.noteHeader}>
                <Text category='h6'>{note.title}</Text>
                <Text category='c1' appearance='hint'>{note.timestamp}</Text>
            </View>
            <Text style={styles.noteContent}>{note.content}</Text>
        </Card>
    );

    return (
        <LayoutGradientBlue>
            <HeaderChat title="Tạo ghi chú" isVisibleBack={false} />
            <View style={styles.container}>
                <Input
                    style={styles.input}
                    placeholder='tiêu đề'
                    value={title}
                    onChangeText={setTitle}
                />
                <Input
                    style={[styles.input, styles.contentInput]}
                    placeholder='Nội dung'
                    multiline
                    textStyle={{ minHeight: 100 }}
                    value={content}
                    onChangeText={setContent}
                />
                <Button style={styles.saveButton} onPress={saveNote}>
                    ➕   Tạo ghi chú 
                </Button>

                <Text category='h5' style={styles.notesHeader}>Ghi chú</Text>
                <ScrollView style={styles.scrollView}>
                    {notes.map(renderNoteItem)}
                </ScrollView>
            </View>
        </LayoutGradientBlue>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 10,
    },
    contentInput: {
        marginBottom: 20,
    },
    saveButton: {
        marginBottom: 20,
    },
    notesHeader: {
        marginBottom: 10,
    },
    scrollView: {
        flex: 1,
    },
    noteCard: {
        marginBottom: 15,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#f7f9fc',
    },
    noteHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    noteContent: {
        color: '#4a4a4a',
    },
});

export default NotesScreen;
