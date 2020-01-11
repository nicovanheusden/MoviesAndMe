import React from 'react'
import {StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData.js'
import FilmItem from './FilmItem.js'
import {getFilmsFromApiWithSearchedText} from '../API/TMDBApi.js'

class Search extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      films : [],
      isloading: false
    }
    this.page = 0;
    this.totalPages = 0;
    this.searchedText= "";
  }

  _displayLoading(){
    if (this.state.isloading){
      return(
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }
  _LoadFilms(){
    this.setState({isloading: true});

    if (this.searchedText.length > 0){
      getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
        this.page = data.page;
        this.totalPages = data.total_pages;
        this.setState({
          films : [...this.state.films, ...data.results],
          isloading:false
        })
      })
    }
  }

  _SearchedTextInputChanged(text){
    this.searchedText = text;
  }


  _SearchFilms(){
    this.page = 0;
    this.totalPages = 0;
    this.setState({
      films: []
    }, () => {
      console.log('Page : ' + this.page + ' / Total Pages : '+this.totalPages + ' / Nombre de films : '+ this.state.films.length);
      this._LoadFilms();
    });
  }

  render(){
    return (
      <View style={styles.main_container}>
        <TextInput
        onSubmitEditing={()=>this._SearchFilms()}
        onChangeText={(text) => this._SearchedTextInputChanged(text)}
        style={styles.TextInput}
        placeholder='Titre du film'
        />
        <Button
        style={{height:50}}
        title='Rechercher'
         onPress={() => this._SearchFilms()}
         />
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages){
                this._LoadFilms();
            }
          }}
          />
          {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({

  main_container:{
    flex:1,
    marginTop:20
  },

  TextInput:{
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container:{
    position:'absolute',
    left:0,
    right:0,
    top:100,
    bottom:0,
    justifyContent:'center',
    alignItems:'center'
  }
})


export default Search
