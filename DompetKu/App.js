/*
  UTS Project: DompetKu
  Nama  : Herdianta Persada Purba
  NIM   : 243303621238
  Prodi : Sistem Informasi - UNPRI
*/

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

export default function App() {
  const [transaksi, setTransaksi] = useState([]);
  const [ket, setKet] = useState('');
  const [nominal, setNominal] = useState('');

  // Logika Hitung Saldo (Requirement: Dashboard Saldo)
  const totalPemasukan = transaksi
    .filter((item) => item.tipe === 'masuk')
    .reduce((sum, item) => sum + item.nominal, 0);
    
  const totalPengeluaran = transaksi
    .filter((item) => item.tipe === 'keluar')
    .reduce((sum, item) => sum + item.nominal, 0);

  const saldoTotal = totalPemasukan - totalPengeluaran;

  // Fungsi Tambah Transaksi (Requirement: Logic State & Array)
  const tambahTransaksi = (tipe) => {
    if (!ket || !nominal) {
      Alert.alert('Eits!', 'Isi dulu keterangan dan nominalnya, Bro.');
      return;
    }

    const baru = {
      id: Date.now().toString(),
      ket: ket,
      nominal: parseInt(nominal),
      tipe: tipe, 
    };

    setTransaksi([baru, ...transaksi]);
    setKet('');
    setNominal('');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.textKet}>{item.ket}</Text>
      <Text style={[
        styles.textNominal, 
        { color: item.tipe === 'masuk' ? '#2ecc71' : '#e74c3c' }
      ]}>
        {item.tipe === 'masuk' ? '+' : '-'} Rp {item.nominal.toLocaleString()}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Dashboard Saldo */}
      <View style={styles.header}>
        <Text style={styles.labelSaldo}>Saldo Total Lo:</Text>
        <Text style={styles.totalSaldo}>Rp {saldoTotal.toLocaleString()}</Text>
      </View>

      {/* Input Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nama Transaksi (e.g. Beli Kopi)"
          value={ket}
          onChangeText={setKet}
        />
        <TextInput
          style={styles.input}
          placeholder="Nominal (Angka)"
          value={nominal}
          onChangeText={setNominal}
          keyboardType="numeric"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2ecc71' }]} 
            onPress={() => tambahTransaksi('masuk')}
          >
            <Text style={styles.buttonText}>Pemasukan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#e74c3c' }]} 
            onPress={() => tambahTransaksi('keluar')}
          >
            <Text style={styles.buttonText}>Pengeluaran</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interactive List (Requirement: FlatList) */}
      <FlatList
        data={transaksi}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Belum ada transaksi, Bro!</Text>
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#2f3640',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  labelSaldo: {
    color: '#dcdde1',
    fontSize: 14,
  },
  totalSaldo: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  form: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dcdde1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.48,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 3,
  },
  textKet: {
    fontSize: 16,
    color: '#2f3640',
  },
  textNominal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: '#7f8c8d',
    fontSize: 16,
  },
});