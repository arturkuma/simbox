import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import Text from './Text';
import { BACKGROUND_COLOR_SECONDARY, FONT_STANDARD_BOLD, TEXT_COLOR_SECONDARY } from '../config/const';

const Container = styled.TouchableOpacity`
    background-color: ${props => (props.active ? TEXT_COLOR_SECONDARY : BACKGROUND_COLOR_SECONDARY)};
    border: 2px solid ${props => (props.active ? TEXT_COLOR_SECONDARY : BACKGROUND_COLOR_SECONDARY)};
    border-radius: 10px;
    height: ${props => props.scale * 100}px;
    width: ${props => props.scale * 100}px;
    align-items: center;
    justify-content: center;

    ${props => (props.clicked ? 'background-color: transparent;' : '')};
    ${props => (props.clicked ? 'border: 2px solid white;' : '')};
`;

const Label = styled(Text)`
  font-size: ${props => props.scale * 25}px;
  text-align: center;
  font-family: ${FONT_STANDARD_BOLD};
`;

export default function Button({ title, active, onPress = () => null, style, scale = 1 }) {
    const [clicked, setClicked] = useState(false);

    useEffect(() => {
        if (clicked) {
            setTimeout(() => {
                setClicked(false);
            }, 500);
        }
    }, [clicked]);

    return (
        <Container
            scale={scale}
            onPress={() => {
                onPress();

                if (!active) {
                    setClicked(true);
                }
            }}
            active={active}
            clicked={clicked && !active}
            style={style}
            activeOpacity={1}
        >
            <Label scale={scale}>{title}</Label>
        </Container>
    );
}
