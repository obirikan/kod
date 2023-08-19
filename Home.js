import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import { useState,useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getDatabase, ref, push, set, get } from '@firebase/database';
import { serverTimestamp } from '@firebase/database';
import { State } from './Context';

const Home = () => {
  const navigation=useNavigation()
  const {setgid}=useContext(State)


    const createGame = async (hostName) => {
        const gamesRef = ref(getDatabase(), 'games');
        const newGameRef = push(gamesRef);
      
        const newGameData =[{
            hostName:'kay',
        }]
        setgid(newGameRef.key)
      
        await set(newGameRef, newGameData);
        navigation.navigate('GameScreen') 
      };




      const joinGame = async () => {
        const gameId='-NcDlq0D4-XnF-znnia3'
        const gameToJoinRef = ref(getDatabase(), `games/${gameId}`);
      
        const gameSnapshot = await get(gameToJoinRef);
        const gameData = gameSnapshot.val();
      
        if (!gameData) {
          throw new Error('Game not found');
        }

        console.log({gameData});
      
        // const playerData = {
        //   name: playerName,
        //   score: 0
        // };
      
        // const playersRef = ref(getDatabase(), `games/${gameId}/players`);
        // await set(push(playersRef), playerData);
      };
  return (
    <View>
      <TouchableOpacity onPress={()=>{createGame()}}>
            <Text>create game</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>{joinGame()}} style={{marginTop:16}}>
            <Text>join game</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({})