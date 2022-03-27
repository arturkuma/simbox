import styled from 'styled-components/native';
import Text from './Text';
import {
    BACKGROUND_COLOR,
    BACKGROUND_COLOR_SECONDARY,
    FONT_DIGITAL, MASTER_PADDING,
    TEXT_COLOR,
    TEXT_COLOR_SECONDARY
} from '../config/const';

const Container = styled.TouchableOpacity`
    border: 2px solid ${props => (props.selected ? TEXT_COLOR : BACKGROUND_COLOR_SECONDARY)};
    padding: 15px;
    border-radius: 10px;
    background-color: ${props => (props.selected ? 'transparent' : BACKGROUND_COLOR_SECONDARY)};
    flex: 1
`;

const Header = styled.View`
    margin-bottom: 11px;
`;

const HeaderText = styled(Text)`
    font-size: ${props => props.scale * 20}px;
    align-self: flex-end;
`;

const NumericContainer = styled.View`
    background-color: ${props => (props.selected ? BACKGROUND_COLOR_SECONDARY : BACKGROUND_COLOR)};
    padding: 10px 10px 5px 10px;
    border-radius: 10px;
`;

const NumericText = styled.Text`
    color: ${props => (props.selected ? TEXT_COLOR_SECONDARY : TEXT_COLOR)};
    font-family: ${FONT_DIGITAL};
    font-size: ${props => props.scale * 55}px;
    align-self: flex-end;
`;

export default function NumericDisplay({ selected, onPress, title, value, style, scale = 1 }) {
    return (
        <Container activeOpacity={1} onPress={onPress} selected={selected} style={style}>
            <Header>
                <HeaderText scale={scale}>{title}</HeaderText>
            </Header>

            <NumericContainer selected={selected}>
                <NumericText scale={scale} selected={selected}>
                    {value || ' '}
                </NumericText>
            </NumericContainer>
        </Container>
    );
}
