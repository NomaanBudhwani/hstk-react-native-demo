import { View, StyleSheet, SafeAreaView, Text, FlatList, ActivityIndicator,TextInput } from 'react-native';
import { AntDesign, Entypo } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import hstkFetch from '../../hstkFetch';

export default function () {

    
    const [data, setData] = useState([])
    const [filteredData, setFilterData ] = useState([])
    const [isLoading, setLoading] =  useState(false)

    useEffect(() => {
        getData()
    },[])
    const getData = async () => {
        setLoading(true)
        const response = await hstkFetch('https://jsonplaceholder.typicode.com/posts');
        const json = await response.json();
        setData(json)
        setFilterData(json)
        setLoading(false)
    }
    const onChangeText = (text) => {
        const res = data.filter(item => item.title.includes(text.toLowerCase()));
        setFilterData(res)
    }
    const renderSearchBar = () => (
        <TextInput 
            onChangeText={onChangeText} 
            style={{borderWidth:1,height:40,margin:8,paddingLeft:8}} 
            placeholder={"Search"}
            />
    )
    const emptyComp = () =>  (  <View >
        {filteredData.length == 0 && !isLoading ? <Text style={{flex:1}}>No Results</Text> : null}
        <ActivityIndicator animating={isLoading} size={"large"}/>
        </View>)
    
    const renderItem = ({item}) => {
        return <View style={styles.cellStyle}>
            <Entypo name="xing-with-circle" size={24} color="black"  />
            <View style={styles.cellContentView}>        
                <View style={styles.cellTextContent}>
                    <Text >{item.title}</Text>
                    <Text >{item.id}</Text>
                </View>
            <AntDesign name='right' size={12}/>
            </View>
        </View>
    }
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={renderSearchBar()}
                style={{height:"100%"}}
                data={filteredData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={emptyComp}
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