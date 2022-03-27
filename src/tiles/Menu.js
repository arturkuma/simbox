import styled from 'styled-components/native';
import { map } from 'lodash';
import { TouchableOpacity } from 'react-native';
import screens from '../config/screens';
import Text from '../components/Text';
import { BACKGROUND_COLOR_SECONDARY, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../config/const';

const Conainer = styled.View`
    flex-direction: row;
    background-color: ${BACKGROUND_COLOR_SECONDARY};
    padding: 0 15px;
`;

const Button = styled.TouchableOpacity`
    padding: 12px;
    margin-right: 10px;
`;

const StyledText = styled(Text)`
    font-size: 25px;
    color: ${props => (props.selected ? TEXT_COLOR_SECONDARY : TEXT_COLOR)}
`;

function Menu({ navigation, ...props }) {
    return (
        <Conainer>
            {map(screens, ({ displayName }, name) => (
                <Button onPress={() => navigation.replace(name)}>
                    <StyledText selected={name === props.route.name}>{displayName}</StyledText>
                </Button>
            ))}
        </Conainer>
    );
}

export default Menu;
