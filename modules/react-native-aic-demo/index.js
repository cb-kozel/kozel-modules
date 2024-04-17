import React, { useEffect, useState } from "react"
import HTML from "react-native-render-html"

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
  ActivityIndicator
} from "react-native"

//Add this entire section to the README.md file
import Icon from "react-native-vector-icons/Ionicons"
import iconFont from "react-native-vector-icons/Fonts/Ionicons.ttf"
const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Ionicons;
}`
const style = document.createElement("style")
document.head.appendChild(style)
style.type = "text/css"
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles
} else {
  style.appendChild(document.createTextNode(iconFontStyles))
}
//End of section to add to README.md file

function AicDemo() {
  const [searchTerm, setSearchTerm] = useState("")
  const [artworks, setArtworks] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedArtwork, setSelectedArtwork] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const hostUrl = "http://localhost:8000"
  useEffect(() => {
    setIsLoading(true)
    fetch(`${hostUrl}/modules/aic-demo/fetch_artworks/`)
      .then(response => response.json())
      .then(data => {
        setArtworks(data)
        setIsLoading(false)
      })
  }, [])
  const searchArtworks = () => {
    setIsLoading(true)
    fetch(`${hostUrl}/modules/aic-demo/fetch_artworks/?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        setArtworks(data)
        setIsLoading(false)
      })
  }
  const getSingleArtwork = async id => {
    setIsLoading(true)
    const response = await fetch(
      `${hostUrl}/modules/aic-demo/fetch_single_artwork/${id}/`
    )
    const artwork = await response.json()
    setIsLoading(false)
    return artwork
  }

  const handlePress = async id => {
    const artwork = await getSingleArtwork(id)

    setSelectedArtwork(artwork)

    setModalVisible(true)
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Art_Institute_of_Chicago_logo.svg/512px-Art_Institute_of_Chicago_logo.svg.png"
        }}
        style={styles.aicLogo}
      />
      <Text style={styles.title}>
        Search Artwork at the Art Institute of Chicago
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Monet"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={searchArtworks}
      />
      <View style={styles.row}>
        <Pressable
          onPress={searchArtworks}
          style={styles.submitButton}
          disabled={!searchTerm}
        >
          <Text style={styles.buttonText}>Search</Text>
        </Pressable>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#B70235"
            style={styles.actInd}
          />
        )}
      </View>

      <FlatList
        data={artworks.data}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => handlePress(item.id)}>
            <Text style={styles.cardTitle}>{item.title}</Text>

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
            <Icon
              name="close"
              size={30}
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <View style={styles.row}>
              <View style={[styles.column, styles.border]}>
                <Image
                  source={{
                    uri: `https://www.artic.edu/iiif/2/${selectedArtwork?.data.image_id}/full/843,/0/default.jpg`
                  }}
                  style={styles.art_image}
                  resizeMode="contain"
                  accessibilityLabel={selectedArtwork?.data.alt_text}
                />
              </View>
              <View style={styles.column}>
                <ScrollView contentContainerStyle={styles.description}>
                  <Text style={styles.cardTitle}>
                    {selectedArtwork?.data.title}
                  </Text>

                  <Text style={styles.cardArtist}>
                    {selectedArtwork?.data.artist_display}
                  </Text>
                  <View style={styles.description}>
                    <HTML
                      source={{ html: selectedArtwork?.data.description || "" }}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  actInd: {
    marginLeft: "2%"
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#F5F5F5"
  },
  border: {
    borderWidth: 1,
    borderColor: "#ECECEC",
    marginRight: 30,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20
  },
  column: {
    flex: 1,
    flexDirection: "column"
  },
  title: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
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
    color: "gray",
    marginBottom: 10
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
  center: { justifyContent: "center", alignItems: "center" },
  submitButton: {
    backgroundColor: "#B70235",
    color: "#FFF",
    marginBottom: 10,
    width: "33%",
    borderRadius: 5
  },
  close: {
    alignSelf: "flex-end",
    backgroundColor: "#B70235",
    color: "#FFF",
    marginBottom: 10,
    width: "15%",
    borderRadius: 5,

    textAlign: "center"
  },
  description: {
    width: "100%",
    marginBottom: 20
  },
  buttonText: {
    color: "#FFF",
    padding: 10,
    textAlign: "center"
  },
  centeredView: {
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
    minHeight: "50%"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  art_image: {
    width: 500,
    height: 500
  }
})
export default {
  title: "Artwork Search",
  navigator: AicDemo
}
