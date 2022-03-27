import styled from 'styled-components/native';
import { fill } from 'lodash';
import { BACKGROUND_COLOR_SECONDARY } from '../config/const';
import Text from './Text';

const containerDivider = 4;
const switchBackgroundDivider = 7;
const switchLegDivider = 22;
const switchHeadDivider = 5;

const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled(Text)`
  font-size: ${props => props.scale * 20}px;
  margin-bottom: ${props => props.scale * 20}px;
  text-align: center;
`;

const Footer = styled(Text)`
  font-size: ${props => props.scale * 20}px;
  margin-top: ${props => props.scale * 20}px;
  text-align: center;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftLabel = styled(Text)`
  font-size: ${props => props.scale * 20}px;
  width: ${props => props.scale * 50}px;
  text-align: right;
`;

const RightLabel = styled(Text)`
  font-size: ${props => props.scale * 20}px;
  width: ${props => props.scale * 50}px;
`;

const SwitchContainer = styled.View`
  height: ${props => props.size}px;
  width: ${props => props.size / containerDivider}px;
`;

const SwitchHead = styled.View`
  background-color: white;
  height: ${props => props.size / switchHeadDivider}px;
  width: ${props => (props.size / switchHeadDivider) * (props.wide ? 2 : 1)}px;
  position: absolute;
  left: ${props => ((props.size / containerDivider) - ((props.size / switchHeadDivider) * (props.wide ? 2 : 1))) / 2};
  top: ${props => (!props.position ? 0 : (props.position === 1 ? (props.size / 2) - (props.size / switchHeadDivider / 2) : (props.size) - (props.size / switchHeadDivider)))};
  border-radius: ${props => props.size / switchHeadDivider}px;
`;

const SwitchLeg = styled.View`
  background-color: white;
  height: ${props => (props.position === 1 ? 0 : (props.size / 2))}px;
  width: ${props => props.size / switchLegDivider}px;
  position: absolute;
  top: ${props => (props.position === 2 ? props.size / 2 : 0)}px;
  left: ${props => ((props.size / containerDivider) - (props.size / switchLegDivider)) / 2};
  border-radius: ${props => props.size / switchLegDivider}px;
`;

const SwitchBackground = styled.View`
  position: absolute;
  left: ${props => ((props.size / containerDivider) - (props.size / switchBackgroundDivider)) / 2};
  top: 0;
  background-color: ${BACKGROUND_COLOR_SECONDARY};
  height: 100%;
  width: ${props => props.size / switchBackgroundDivider}px;
  border-radius: ${props => props.size / switchBackgroundDivider / 2}px;
`;

const ClickAreasContainer = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;

const ClickArea = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  top: ${props => (props.size / props.clickAreas) * props.area}px;
  height: ${props => 100 / props.clickAreas}%;
  width: 100%;
`;

export default function Switch({ style, wide, position, clickAreas, onPress, topText, bottomText, leftText, rightText, scale = 1 }) {
    const size = 250 * scale;

    return (
        <Container style={style}>
            <Header scale={scale} size={size}>{topText || ' '}</Header>

            <Row>
                <LeftLabel scale={scale}>{leftText || ' '}</LeftLabel>

                <SwitchContainer size={size}>
                    <SwitchBackground size={size} />
                    <SwitchLeg size={size} position={position} />
                    <SwitchHead size={size} wide={wide} position={position} />

                    <ClickAreasContainer>
                        {(fill(Array(clickAreas))).map((i, k) => (
                            <ClickArea size={size} clickAreas={clickAreas} area={k} activeOpacity={1} onPress={() => onPress(k)} />
                        ))}
                    </ClickAreasContainer>
                </SwitchContainer>

                <RightLabel scale={scale}>{rightText || ' '}</RightLabel>
            </Row>

            <Footer scale={scale} size={size}>{bottomText || ' '}</Footer>
        </Container>
    );
}
