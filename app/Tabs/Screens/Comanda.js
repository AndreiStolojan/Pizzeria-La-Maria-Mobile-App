import React from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import * as SQLite from "expo-sqlite";
import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from 'expo-document-picker';

function Comanda() {
  const [db, setDb] = useState(SQLite.openDatabase("example.db"));
  const [isLoading, setIsLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [currentName, setCurrentName] = useState(undefined);

  const exportDb = async () => {
    await Sharing.shareAsync(
      FileSystem.documentDirectory + "SQLite/example.db"
    );
  };

  const importDb = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true
    });

    if (result.type === 'succes' )
    {
      setIsLoading(true);
      if( !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
      }

      const base64 = await FileSystem.readAsStringAsync(
        result.uri,
        {
          encoding: FileSystem.EncodingType.Base64
        }
      );

      await FileSystem.writeAsStringAsync(FileSyste.documentDirectory + 'SQLite/example.db',base64,{encoding: FileSystem.EncodingType.Base64})
      await db.closeAsync();
      setDb(SQLite.openDatabase('example.db'));
    }
  }

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS names (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)", // Completarea parantezei lipsă și corectarea sintaxei CREATE TABLE
        [],
        () => console.log("Table created successfully"), // Opcional, puteți adăuga un mesaj de confirmare pentru crearea tabelei
        (txObj, error) => console.log(error)
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM names", // Corectarea sintaxei SELECT
        [],
        (txObj, resultSet) => setNames(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading names...</Text>
      </View>
    );
  }

  const showNames = () => {
    return names.map((name, index) => {
      return (
        <View style={styles.row} key={index}>
          <Text>{name.name}</Text>
          <Button title="Delete" onPress={() => deleteName(name.id)} />
          <Button title="Update" onPress={() => updateName(name.id)} />
          
        </View>
      );
    });
  };

  const addName = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO names (name) VALUES (?)", // Corectarea sintaxei INSERT INTO
        [currentName],
        (txObj, resultSet) => {
          let existingNames = [...names];
          existingNames.push({ id: resultSet.insertId, name: currentName });
          setNames(existingNames);
          setCurrentName(undefined);
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM names WHERE id = ?",
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names].filter((name) => name.id !== id);
            setNames(existingNames);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const updateName = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE names SET name = ? WHERE id = ?",
        [currentName, id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            let existingNames = [...names];
            const indexToUpdate = existingNames.findIndex(
              (name) => name.id === id
            );
            existingNames[indexToUpdate].name = currentName;
            setNames(existingNames);
            setCurrentName(undefined);
          }
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  return (
    <ScrollView nestedScrollEnabled={true} style={styles.scrollView}>
      <View style={styles.container}>
        <TextInput
          value={currentName}
          placeholder="name"
          onChangeText={setCurrentName}
        />
        <Button title="Add Name" onPress={addName} />
        {showNames()}
        <Button title = "Export Db" onPress={exportDb} />
        <Button title = "Import Db" onPress={importDb} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    // Am corectat numele stilului de aici
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "space-between",
    margin: 8,
  },
});

export default Comanda;
