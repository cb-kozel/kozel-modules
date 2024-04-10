import React, { useEffect, useState } from "react"
import {
  TextInput,
  Pressable,
  FlatList,
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  Button
} from "react-native"

function AicDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [artworks, setArtworks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)

  useEffect(() => {
    fetch("http://localhost:8000/modules/aic-demo/fetch_artworks/")
      .then(response => response.json())
      .then(data => setArtworks(data))
  }, [])
  const searchArtworks = () => {
    fetch(
      `http://localhost:8000/modules/aic-demo/fetch_artworks/?q=${searchTerm}`
    )
      .then(response => response.json())
      .then(data => setArtworks(data))
  }

  const handlePress = item => {
    setSelectedArtwork(item)
    setModalVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Art_Institute_of_Chicago_logo.svg/512px-Art_Institute_of_Chicago_logo.svg.png"
          }}
          style={styles.aicLogo}
        />
        <Text style={styles.title}>Artwork Search</Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Monet"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
      <Pressable onPress={searchArtworks} style={styles.submitButton}>
        <Text style={styles.buttonText}>Search</Text>
      </Pressable>
      <FlatList
        data={artworks.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handlePress(item)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardArtist}>{item.artist_title}</Text>
            {item.image_url && (
              <Image source={{ uri: item.image_url }} style={styles.image} />
            )}
          </Pressable>
        )}
        numColumns={3} // add this line
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{selectedArtwork?.title}</Text>
            <Text style={styles.modalText}>
              {selectedArtwork?.artist_title}
            </Text>
            <Button
              onPress={() => setModalVisible(!modalVisible)}
              title="Close"
            />
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#F5F5F5"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "flex-end",
    marginLeft: 10
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    color: "#808080"
  },
  card: {
    backgroundColor: "#FFF",
    width: "33%",
    padding: 10,
    marginBottom: 10,
    marginRight: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold"
  },
  cardArtist: {
    fontSize: 16,
    color: "gray"
  },
  image: {
    height: 200,
    width: "100%",
    marginTop: 10
  },
  aicLogo: {
    width: 150,
    height: 150
  },
  row: {
    flexDirection: "row",
    marginBottom: 10
  },
  submitButton: {
    backgroundColor: "#B70235",
    color: "#FFF",
    marginBottom: 10,
    width: "33%",
    borderRadius: 5
  },
  buttonText: {
    color: "#FFF",
    padding: 10,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})
export default {
  title: "Artwork Search",
  navigator: AicDemo
}
