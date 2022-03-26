import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Test from './src/Test';
import Test2 from './src/Test2';
import Menu from './src/components/Menu';

const Stack = createNativeStackNavigator();

const linking = {
    prefixes: [],
    config: {
        screens: {
            Test: '',
            Test2: 'test2'
        }
    }
};

export default function App() {
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator>
                <Stack.Screen name="Test" component={Test} options={{ header: (props) => <Menu {...props} /> }} />
                <Stack.Screen name="Test2" component={Test2} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
