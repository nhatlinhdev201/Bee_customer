import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Layout, Text, Select, SelectItem, Button, Card, Spinner, Input } from '@ui-kitten/components';
import axios from 'axios';
import LayoutGradientBlue from '../components/layouts/LayoutGradientBlue';
import languages from './languages';
import HeaderChat from './HeaderChat';
// import { createSampleData } from '../../chat/createSampleData';

const TranslatorScreen = () => {
  const [fromLanguage, setFromLanguage] = useState('en-GB');
  const [toLanguage, setToLanguage] = useState('vi-VN');
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [translationHistory, setTranslationHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const languageOptions = Object.entries(languages).map(([code, name]) => ({ text: name, value: code }));
  // createSampleData();
  const translateText = async () => {
    if (fromText.trim() === '') return;

    setIsLoading(true);
    setToText('');

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLanguage}|${toLanguage}`;
      const response = await axios.get(url);

      if (response.data.responseStatus === 200) {
        const translations = response.data.matches.filter(match => match.source === fromLanguage && match.target === toLanguage);
        const bestTranslation = translations.length > 0 ? translations[0].translation : 'No translation available';

        setToText(bestTranslation);

        setTranslationHistory(prevHistory => [
          {
            id: Date.now().toString(),
            from: fromText,
            to: bestTranslation,
            fromLang: languages[fromLanguage],
            toLang: languages[toLanguage]
          },
          ...prevHistory
        ]);
      } else {
        setToText('Hãy thử lại, lỗi kết nối.');
      }
    } catch (error) {
      console.error('Translation error:', error);
      setToText(`Lỗi: ${error.message}. Hãy thử lại.`);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHistoryItem = (item) => (
    <Card key={item.id} style={styles.historyCard}>
      <Text category='s1'>{item.fromLang} → {item.toLang}</Text>
      <Text category='p1'>{item.from}</Text>
      <Text category='p2'>{item.to}</Text>
    </Card>
  );

  return (
    <LayoutGradientBlue>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <HeaderChat title="Dịch" isVisibleBack={false} />
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.languageSelector} level='1'>
            <Select
              style={styles.select}
              value={languageOptions.find(option => option.value === fromLanguage).text}
              onSelect={index => setFromLanguage(languageOptions[index.row].value)}
            >
              {languageOptions.map(option => (
                <SelectItem key={option.value} title={option.text} />
              ))}
            </Select>

            <Button
              style={styles.switchButton}
              onPress={() => {
                const temp = fromLanguage;
                setFromLanguage(toLanguage);
                setToLanguage(temp);
              }}
            >
              ⇄
            </Button>

            <Select
              style={styles.select}
              value={languageOptions.find(option => option.value === toLanguage).text}
              onSelect={index => setToLanguage(languageOptions[index.row].value)}
            >
              {languageOptions.map(option => (
                <SelectItem key={option.value} title={option.text} />
              ))}
            </Select>
          </View>
          <Input
            multiline={true}
            textStyle={styles.inputText}
            placeholder='Nhập văn bản cần dịch'
            value={fromText}
            onChangeText={setFromText}
          />

          <Button
            style={styles.button}
            onPress={translateText}
            accessoryLeft={isLoading ? (props) => <Spinner {...props} /> : null}
            disabled={isLoading}
          >
            {isLoading ? 'Đang dịch...' : 'Dịch'}
          </Button>

          <Input
            multiline={true}
            textStyle={styles.inputText}
            placeholder='...'
            value={toText}
            disabled={true}
          />

          <Text category='h5' style={styles.historyTitle}>-------</Text>

          {translationHistory.map(renderHistoryItem)}
        </ScrollView>
      </KeyboardAvoidingView>
    </LayoutGradientBlue>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  select: {
    flex: 1,
  },
  switchButton: {
    marginHorizontal: 10,
  },
  inputText: {
    minHeight: 100,
    color: '#000',
    textAlignVertical: 'top',
  },
  button: {
    marginVertical: 20,
  },
  historyTitle: {
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  historyCard: {
    marginBottom: 10,
  },
});

export default TranslatorScreen;
