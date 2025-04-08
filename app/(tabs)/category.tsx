import { useState } from 'react';
import { Modal, Text, TextInput, TouchableOpacity, View } from 'react-native';
import CategoryIconDisplay from '../Components/GoalComponents/CategoryComponent';
import styles from '../styles/styles';

export default function Category() {
  const [modalVisible, setModalVisible] = useState(false);
  const [incomeSource, setIncomeSource] = useState('');
  const [incomeAmount, setIncomeAmount] = useState('');

  function addWindow() {
    setModalVisible(true);
  }

  function closeAddWindow() {
    setModalVisible(false);
  }

  function addIncome() {
    setIncomeSource('');
    setIncomeAmount('');
    setModalVisible(false);
  }
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { paddingBottom: 15, paddingTop: 50 }]}>
        Available Categories
      </Text>
      <CategoryIconDisplay />
      <View style={{ paddingBottom: 25 }}>
        <TouchableOpacity style={styles.button} onPress={addWindow}>
          <Text style={styles.buttonText}>Add your Income</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeAddWindow}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.text}>Add Income</Text>

              {/* Income Source Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Income Source"
                value={incomeSource}
                onChangeText={setIncomeSource}
              />

              {/* Income Amount Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Income Amount"
                value={incomeAmount}
                onChangeText={setIncomeAmount}
                keyboardType="numeric"
              />

              {/* Buttons */}
              <View style={styles.modalButtonContainer}>
                <TouchableOpacity
                  onPress={addIncome}
                  style={[styles.button, { width: 140 }]}
                >
                  <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeAddWindow}
                  style={[styles.button, { width: 140 }]}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
