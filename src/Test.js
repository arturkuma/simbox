import { Text, Button } from 'react-native';
import styled from 'styled-components/native';

const StyledView = styled.View`
  background-color: green;
`;

export default function Test({ navigation }) {
    return (
        <StyledView>
            <Text>elo</Text>

            <Button
                title="Go to Test2"
                onPress={() => navigation.navigate('Test2')}
            />
        </StyledView>
    );
}
