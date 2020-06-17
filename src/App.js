import React, { useEffect, useState } from "react";
import api from "./services/api";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepository ] = useState([]);

  useEffect( () => {
    api.get("/repositories").then( res => {
      //return res.data;
      setRepository(res.data)
    }, []);
  }, []);

  async function handleLikeRepository(a) {
    // Implement "Like Repository" functionality
    await api.post(`repositories/${a}/like`);

    const newRepositories = repositories.map( el => {
      const newLike = el.likes + 1;
        if(el.id === a){
          el.likes = newLike;
        }
      return el
    });

    setRepository(newRepositories)
  }



  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={repository => {repository.id}}
          renderItem={({ item }) => (
            <View style={styles.repositoryContainer}>
             <Text style={styles.repository}>{item.title}</Text>
   
             <View style={styles.techsContainer}>
                {item.techs.map(element => (
                  <Text  style={styles.tech} key={element}>{ element } </Text>                
                ))}
             </View>

             <View style={styles.likesContainer}>
               <Text
                 style={styles.likeText}
                 // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                 testID={`repository-likes-${item.id}`}
               >
                 {item.likes} curtidas
               </Text>
             </View> 
   
             <TouchableOpacity
               style={styles.button}
               onPress={() => handleLikeRepository(item.id)}
               // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
               testID={`like-button-${item.id}`}
             >
               <Text style={styles.buttonText}>Curtir</Text>
             </TouchableOpacity>
           </View>
     

          )}
          
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});