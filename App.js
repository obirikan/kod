import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput ,Button} from 'react-native';
import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import { getDatabase, ref, push, onValue, serverTimestamp ,set} from '@firebase/database';
import 'firebase/database';
import { dbs } from './firebase';
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  equalTo, get 
} from "@firebase/firestore";



export default function App() {
  const [player1,setplayer1]=useState(0)
  const [player2,setplayer2]=useState(5)
  const [player3,setplayer3]=useState(6)
  const [player4,setplayer4]=useState(10)
  const [timeleft,settime]=useState(60)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [update,setupdate]=useState([])

  // const playersRef = collection(db, 'players');

// Listen for updates in the players' collection
// const q = query(playersRef);




    // Timer function
    const startTimer = () => {
      if (timeleft > 0 &&!isSubmitted) {
        setTimeout(() => {
          settime(timeleft - 1);
        }, 1000); // Countdown every 1 second (1000 milliseconds)
      }else {
        // Set players' values to 0 when timeLeft is zero
        setplayer1(0);
        // handleNumberSubmit()
      }
    };
    useEffect(() => {
      startTimer();
  
      const playersRef = ref(dbs, 'players');
      const unsubscribe = onValue(playersRef, (snapshot) => {
        const data = snapshot.val();
        setupdate(data); // Update the entire data object
      });
  
      return () => {
        unsubscribe();
      };
    }, [timeleft, isSubmitted]);

    const handleNumberSubmit = async() => {
      setIsSubmitted(true);
      // const playersRef = collection(db, 'players');
    const average = (player1 + player2 + player3 + player4) / 4;
  
    const multipliedAverage = average * 0.8;
    //
    const players = [
      { name: 'Player 1', number: player1 },
      { name: 'Player 2', number: player2 },
      { name: 'Player 3', number: player3 },
      { name: 'Player 4', number: player4 },
    ]; 
    // const newPlayerDoc = await addDoc(playersRef, {
    //   player1: player1,
    //   timestamp: serverTimestamp(),
    // });
    const playersRef = ref(dbs, 'players');
    const newPlayerRef = push(playersRef);
    await set(newPlayerRef, {
      player1: player1,
      timestamp: serverTimestamp(),
    });
    // Find the player whose number is closest to the multiplied average
    const closestPlayer = players.reduce((prev, curr) => {
      return Math.abs(curr.number - multipliedAverage) < Math.abs(prev.number - multipliedAverage) ? curr : prev;
    });

    console.log(`${closestPlayer.name} is the winner with an absolute difference of ${closestPlayer.number} and an average number of ${multipliedAverage}`);
    };




  return (
    <View style={styles.container}>
      <Text>{timeleft}</Text>
      {Object.keys(update).map((key) => {
      const playerName = key.slice(1); // Remove the leading "-"
      return <Text key={key}>{}: {update[key].player7}</Text>;
    })}
      <TextInput
        keyboardType="numeric"
        placeholder="Player 1 Number"
        onChangeText={value => setplayer1(parseInt(value))}
      />
      <Button title="Submit Numbers" onPress={handleNumberSubmit} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
