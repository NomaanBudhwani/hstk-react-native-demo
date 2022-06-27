import { View, StyleSheet, SafeAreaView, Text, FlatList, ActivityIndicator,TextInput, TouchableOpacity } from 'react-native';
import {  Entypo,FontAwesome  } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import hstkFetch from '../../hstkFetch';

export default function({ route, navigation }) {

    const { id } = route.params;
    const [data, setData] = useState({})
    const [commentsList, setCommentsList] = useState([])
    
    useEffect(() => {
        fetchPost()
        fetchComments()
    },[])

    const fetchPost = async () => {
        const response = await hstkFetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const json = await response.json();
        setData(json)
    }
    const fetchComments = async () => {
        const response = await hstkFetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        const json = await response.json();
        setCommentsList(json)
    }
    const hideComment = (id) => {
        let updatedComments = commentsList.filter(item => item.id != id)
        setCommentsList(updatedComments)
    }
    const renderItem = ({item}) => {
        return (
                <View style={styles.cellStyle} >
                <Entypo name="xing-with-circle" size={24} color="black"  />
                <View style={styles.cellContentView}>        
                        <View style={styles.cellTextContent}>
                            <Text >{item.email}</Text>
                            <Text >{item.body}</Text>
                        </View>
                        <TouchableOpacity onPress={() => hideComment(item.id)}>
                            <FontAwesome name="remove" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
        )
    }

    return ( 
        <SafeAreaView style={styles.container}>
            <View style={{padding:16}}>
                <Text style={{marginBottom:8, fontSize:16, fontWeight:'600'}}>{data?.title}</Text>
                <Text>{data?.body}</Text>
            </View>
            <FlatList

                data={commentsList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
    cellStyle:{
        padding:12,
        flex:1,
        flexDirection:'row',
        borderBottomWidth:1,
    },
    cellTextContent:{
        width:'50%',
        marginLeft:12
    },
    cellContentView : {
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1
    }
})