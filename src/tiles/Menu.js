import styled from 'styled-components/native';
import { map } from 'lodash';
import { TouchableOpacity } from 'react-native';
import screens from '../config/screens';

const StyledMenu = styled.View`
    flex-direction: row;
`;

const StyledText = styled.View`
    font-family: FONT_STANDARD;
`;

function Menu({ navigation }) {
    return (
        <StyledMenu>
            {map(screens, ({ displayName }, name) => (
                <TouchableOpacity onPress={() => navigation.navigate(name)}>
                    <StyledText>{displayName}</StyledText>
                </TouchableOpacity>
            ))}
        </StyledMenu>
    );
}

export default Menu;
