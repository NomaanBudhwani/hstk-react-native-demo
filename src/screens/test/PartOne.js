import { View, StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';
import localPlaceholderData from '../../localPlaceholderData';
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function () {
    return (
        <SafeAreaView>
            <Text>
                Part One
            </Text>
            <FlatList
                data={localPlaceholderData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                />
        </SafeAreaView>
    )
}



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

const styles = StyleSheet.create({
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