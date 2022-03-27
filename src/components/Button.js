import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import Text from './Text';
import { BACKGROUND_COLOR_SECONDARY, TEXT_COLOR_SECONDARY } from '../config/const';

const Container = styled.TouchableOpacity`
    background-color: ${props => (props.active ? TEXT_COLOR_SECONDARY : BACKGROUND_COLOR_SECONDARY)};
    border: 2px solid ${props => (props.active ? TEXT_COLOR_SECONDARY : BACKGROUND_COLOR_SECONDARY)};
    border-radius: 10px;
    height: 100px;
    width: 100px;
    align-items: center;
    justify-content: center;

    ${props => (props.clicked ? 'background-color: transparent;' : '')};
    ${props => (props.clicked ? 'border: 2px solid white;' : '')};
`;

const Label = styled(Text)`
  font-size: 25px;
  text-align: center;
`;

export default function Button({ title, active, onPress = () => null, style }) {
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
            <Label>{title}</Label>
        </Container>
    );
}
