import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import { getImageFromApi } from '../API/TMDBApi.js'

class FilmItem extends React.Component {
  render(){
    const film = this.props.film;
    return (
      <View style={styles.main_container}>
      <Image style={styles.img} source={{uri: getImageFromApi(film.poster_path)}}/>
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title_text}>{film.title}</Text>
                <Text style={styles.vote}>{film.vote_average}</Text>
            </View>
            <View style={styles.description}>
                <Text style={styles.text_description} numberOfLines={6}>{film.overview}</Text>
            </View>
            <View style={styles.date}>
                <Text >Sortie le {film.release_date}</Text>
            </View>
        </View>

      </View>
    )
  }
}


const styles = StyleSheet.create({
  main_container:{
    flex:1,
    flexDirection: 'row',
    marginTop:20
  },
  img:{
    margin:5,
    width:120,
    height:180
  },
  title_text:{
    width: 150,
    fontWeight:'bold',
    color:'red',
    flexWrap:'wrap'
  },
  content:{
    flex:3,
    flexDirection:'column'
  },
  header:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',

  },
  description:{
    flex:2,

    alignItems:'center',
    justifyContent:'center'
  },
  date:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'flex-end',
  },
  text_description:{
    fontStyle:'italic'
  },
  vote:{
    fontSize:20,
    fontWeight:'bold'
  }


})


export default FilmItem
