import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,TextInput ,Button} from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {
  const [player1,setplayer1]=useState(0)
  const [player2,setplayer2]=useState(5)
  const [player3,setplayer3]=useState(6)
  const [player4,setplayer4]=useState(10)
  const [timeleft,settime]=useState(60)
  const [isSubmitted, setIsSubmitted] = useState(false);

    // Timer function
    const startTimer = () => {
      if (timeleft > 0 &&!isSubmitted) {
        setTimeout(() => {
          settime(timeleft - 1);
        }, 1000); // Countdown every 1 second (1000 milliseconds)
      }else {
        // Set players' values to 0 when timeLeft is zero
        setplayer1(0);
      }
    };

    useEffect(()=>{
          startTimer()
    },[timeleft,isSubmitted])

    const handleNumberSubmit = () => {
      setIsSubmitted(true);
    
    const average = (player1 + player2 + player3 + player4) / 4;
  
    const multipliedAverage = average * 0.8;
    //
    const players = [
      { name: 'Player 1', number: player1 },
      { name: 'Player 2', number: player2 },
      { name: 'Player 3', number: player3 },
      { name: 'Player 4', number: player4 },
    ];

    // Find the player whose number is closest to the multiplied average
    const closestPlayer = players.reduce((prev, curr) => {
      return Math.abs(curr.number - multipliedAverage) < Math.abs(prev.number - multipliedAverage) ? curr : prev;
    });

    alert(`${closestPlayer.name} is the winner with an absolute difference of ${closestPlayer.number} and an average number of ${multipliedAverage}`);
    };


  return (
    <View style={styles.container}>
      <Text>{timeleft}</Text>
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
