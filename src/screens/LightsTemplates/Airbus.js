import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { CONFIG_REDUCER } from '../../store';
import { emitActionInfo, getSimValue } from '../../services/sim-data';
import Switch from '../../components/Switch';
import { MASTER_PADDING } from '../../config/const';
import Text from '../../components/Text';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Section = styled.View`
  flex-direction: column;
  align-items: flex-end;
  background-color: #0e0e0e;
  padding: ${MASTER_PADDING} 0;
  border-radius: 10px;
`;

const SectionRow = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

const WrappedSwitch = styled(Switch)`
  margin-right: ${props => (props.lastChild ? 0 : '20px')};
`;

const WrappedText = styled(Text)`
    text-align: center;
`;

function Airbus() {
    const scale = 0.55;

    return (
        <Container>
            <Section style={{ paddingLeft: 20, paddingRight: 50 }}>
                <SectionRow style={{ paddingTop: 30 }}>
                    <WrappedText style={{ position: 'absolute', left: 165, top: 0, width: 100, zIndex: 1 }}>EXTLT</WrappedText>

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('strobeLights')}
                        clickAreas={3}
                        topText={'STROBE\nON'}
                        rightText={'A\nU\nT\nO'}
                        bottomText="OFF"
                        onPress={(i) => emitActionInfo(`strobeLightsSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('beaconLights')}
                        clickAreas={2}
                        topText={'BEACON\nON'}
                        bottomText="OFF"
                        onPress={(i) => emitActionInfo(`beaconLightsSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('wingLights')}
                        clickAreas={2}
                        topText={'WING\nON'}
                        bottomText="OFF"
                        onPress={(i) => emitActionInfo(`wingLightsSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('navLights')}
                        clickAreas={3}
                        topText={'NAV & LOGO\n2'}
                        rightText={1}
                        bottomText="OFF"
                        onPress={(i) => emitActionInfo(`navLightsSwitchChange${i}`)}
                    />
                </SectionRow>

                <SectionRow style={{ paddingTop: 50 }}>
                    <WrappedText style={{ position: 'absolute', left: 160, top: 20, width: 100, zIndex: 1 }}>- LAND -</WrappedText>

                    <WrappedText style={{ position: 'absolute', left: 160, top: 100, width: 100, zIndex: 1 }}>{'ON\n\nOFF\n\nRETRACT'}</WrappedText>

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('rwyTurnoffLights')}
                        clickAreas={2}
                        topText="RWY TURN OFF"
                        bottomText="OFF"
                        onPress={(i) => emitActionInfo(`rwyTurnoffLightsSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('landingLightsLeft')}
                        wide
                        clickAreas={3}
                        topText="L"
                        onPress={(i) => emitActionInfo(`landingLightsLeftSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        position={getSimValue('landingLightsRight')}
                        wide
                        clickAreas={3}
                        topText="R"
                        onPress={(i) => emitActionInfo(`landingLightsRightSwitchChange${i}`)}
                    />

                    <WrappedSwitch
                        scale={scale}
                        className="noseSwitch"
                        position={getSimValue('noseLights')}
                        clickAreas={3}
                        topText="NOSE"
                        rightText={'TO\n\nTAXI\n\nOFF'}
                        onPress={(i) => emitActionInfo(`noseLightsSwitchChange${i}`)}
                    />
                </SectionRow>
            </Section>
        </Container>
    );
}

Airbus = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({ commonStore })
)(Airbus);

export default Airbus;
