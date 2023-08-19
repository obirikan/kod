import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput ,Button} from 'react-native';
import { useEffect, useState,useContext } from 'react';
import firebase from 'firebase/app';
import { getDatabase, ref, push, onValue, serverTimestamp ,set,update} from '@firebase/database';
import 'firebase/database';
import { dbs } from './firebase';
import { State } from './Context';

export default function App() {
  const [player1,setplayer1]=useState(0)
  const [player2,setplayer2]=useState(5)
  const [player3,setplayer3]=useState(6)
  const [player4,setplayer4]=useState(10)
  const [timeleft,settime]=useState(60)
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [updates,setupdate]=useState([])
  const {gid}=useContext(State)
  const [functionCalled, setFunctionCalled] = useState(false);
  

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
    // useEffect(() => {
    //   startTimer();
  
    //   const playersRef = ref(dbs, 'games');
    //   const unsubscribe = onValue(playersRef, (snapshot) => {
    //     const data = snapshot.val();
    //     setupdate(data); // Update the entire data object
    //     console.log(data);
    //   });
  
    //   return () => {
    //     unsubscribe();
    //   };
    // }, [timeleft, isSubmitted]);

    const call=()=>{
        alert('all')
    }

    useEffect(() => {
        startTimer();
      
        if (gid && !functionCalled) {
          const gameRef = ref(dbs, `games/${gid}`);
          const unsubscribe = onValue(gameRef, (snapshot) => {
            const data = snapshot.val();
            setupdate(data.data); // Update the entire data object for the hosted game
            console.log(data.data);
            // console.log((data))
            const dataLength = data.data ? Object.keys(data.data).length : 0;
            console.log(dataLength);
            if(dataLength==4 && !functionCalled){
                call();
                setFunctionCalled(true);
            }
          });
      
          return () => {
            unsubscribe();
          };
        }
      }, [timeleft, isSubmitted, gid]);
      
      
      

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


    const playersRef = ref(dbs, 'players');
    const newPlayerRef = push(playersRef);
    const playerdata=[
      {
        player: player1,
        timestamp: serverTimestamp(),
        name:'kelvin'
      }
    ]
    await set(newPlayerRef,playerdata);
    // Find the player whose number is closest to the multiplied average
    const closestPlayer = players.reduce((prev, curr) => {
      return Math.abs(curr.number - multipliedAverage) < Math.abs(prev.number - multipliedAverage) ? curr : prev;
    });

    console.log(`${closestPlayer.name} is the winner with an absolute difference of ${closestPlayer.number} and an average number of ${multipliedAverage}`);
    };

   const playerName='jk8'
    const submitNumber = async () => {
        const newNumber=87
        if (gid) {
          if (playerName === playerName) {
            // If the player is the host, update their number directly in the database
            const data=[{
                    name:'john',
                    number:27
                }]
    
            const hostGameRef = ref(dbs, `games/${gid}/data`);
            await push(hostGameRef,data);
          } else {
            // If the player is not the host, push the new number to the data array
            const hostGameRef = ref(dbs, `games/${gid}/data`);
            await push(hostGameRef, {
              name: playerName,
              number: newNumber
            });
          }
        }
      };
      

 console.log(updates);
  return (
    <View style={styles.container}>
      <Text>{timeleft}</Text>
      <Text>{gid}</Text>
      {/* <Text>host name{update[0].hostName}</Text> */}
      {updates ? (
  Object.keys(updates).map((dataKey) => {
    const data = updates[dataKey];
    return data.map((entry, index) => (
      <Text key={index}>{entry.name}: {entry.number}</Text>
    ));
  })
) : (
  <Text>No data available</Text>
)}
      <TextInput
        keyboardType="numeric"
        placeholder="Player 1 Number"
        onChangeText={value => setplayer1(parseInt(value))}
      />
      <Button title="Submit Numbers" onPress={submitNumber} />
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
