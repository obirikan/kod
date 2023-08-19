import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createStackNavigator();
import Home from './Home';
import GameScreen from './GameScreen'

function MyStack() {
  return (
    <NavigationContainer independent={true}>  
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
    </NavigationContainer>  
  );
}

export default MyStack