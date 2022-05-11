import styled from 'styled-components/native';
import { map } from 'lodash';
import { TouchableOpacity } from 'react-native';
import screens from '../config/screens';
import Text from '../components/Text';
import { BACKGROUND_COLOR_SECONDARY, FONT_STANDARD_BOLD, TEXT_COLOR, TEXT_COLOR_SECONDARY } from '../config/const';
import { socket } from '../services/socket';

const Conainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    background-color: ${BACKGROUND_COLOR_SECONDARY};
    padding: 0 15px;
`;

const Section1 = styled.View`
    flex-direction: row;
`;

const Section2 = styled.View`
    flex-direction: row;
`;

const Button = styled.TouchableOpacity`
    padding: 12px;
    margin-right: 10px;
`;

const StyledText = styled(Text)`
    font-size: 25px;
    color: ${props => (props.selected ? TEXT_COLOR_SECONDARY : TEXT_COLOR)};
    font-family: ${FONT_STANDARD_BOLD};
`;

function Menu({ navigation, ...props }) {
    return (
        <Conainer>
            <Section1>
                {map(screens, ({ displayName }, name) => (
                    <Button onPress={() => navigation.replace(name)}>
                        <StyledText selected={name === props.route.name}>{displayName}</StyledText>
                    </Button>
                ))}
            </Section1>

            <Section2>
                <Button onPress={() => { socket.emit('setCommonStoreProperty', { key: 'aircraftConfig', value: null }); }}>
                    <StyledText>Profile</StyledText>
                </Button>
            </Section2>
        </Conainer>
    );
}

export default Menu;
