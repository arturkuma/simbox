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
  flex-direction: row;
  align-items: flex-end;
  background-color: #0e0e0e;
  padding: ${MASTER_PADDING} 0;
  border-radius: 10px;
  margin-right: ${props => (props.lastChild ? 0 : 20)}px;
`;

const WrappedSwitch = styled(Switch)`
  margin-right: ${props => (props.lastChild ? 0 : '-30px')};
`;

const WrappedText = styled(Text)`
    text-align: center;
`;

function Boeing() {
    const scale = 0.62;

    return (
        <Container>
            <Section style={{ paddingTop: 30, paddingBottom: 50 }}>
                <WrappedText style={{ position: 'absolute', left: 115, top: 15, width: 100, zIndex: 1 }}>LANDING</WrappedText>

                <WrappedText style={{ position: 'absolute', left: 35, top: 35, width: 100, zIndex: 1 }}>RETRACT</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 175, top: 35, width: 100, zIndex: 1 }}>OFF</WrappedText>

                <WrappedText style={{ position: 'absolute', left: 25, top: 240, width: 120, zIndex: 1 }}>{'ON\nRETRACTABLE'}</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 175, top: 240, width: 100, zIndex: 1 }}>{'ON\nFIXED'}</WrappedText>

                {getSimValue('hasLedLights') && (
                    <>
                        <WrappedSwitch
                            scale={scale}
                            wide
                            position={getSimValue('landLightsRetLeftPos')}
                            clickAreas={3}
                            bottomText="L"
                            onPress={(i) => emitActionInfo(`landLightsRetLeftPosChange${i}`)}
                        />

                        <WrappedSwitch
                            wide
                            scale={scale}
                            position={getSimValue('landLightsRetRightPos')}
                            clickAreas={3}
                            bottomText="R"
                            onPress={(i) => emitActionInfo(`landLightsRetRightPosChange${i}`)}
                        />
                    </>
                )}

                <WrappedSwitch
                    scale={scale}
                    wide
                    position={getSimValue('landLightsLeftPos')}
                    clickAreas={2}
                    bottomText="L"
                    onPress={(i) => emitActionInfo(`landLightLeftPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    wide
                    position={getSimValue('landLightsRightPos')}
                    clickAreas={2}
                    bottomText="R"
                    onPress={(i) => emitActionInfo(`landLightRightPosChange${i}`)}
                    lastChild
                />
            </Section>

            <Section style={{ paddingTop: 60 }}>
                <WrappedText style={{ position: 'absolute', left: 37, top: 20, width: 100, zIndex: 1 }}>{'RUNWAY\nTURNOFF'}</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 35, top: 80, width: 100, zIndex: 1 }}>OFF</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 105, top: 80, width: 100, zIndex: 1 }}>OFF</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 35, top: 240, width: 100, zIndex: 1 }}>ON</WrappedText>
                <WrappedText style={{ position: 'absolute', left: 105, top: 240, width: 100, zIndex: 1 }}>ON</WrappedText>

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('rwyLightLeft')}
                    clickAreas={2}
                    topText="L"
                    onPress={(i) => emitActionInfo(`rwyLightLeftPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('rwyLightRight')}
                    clickAreas={2}
                    topText="R"
                    onPress={(i) => emitActionInfo(`rwyLightRightPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('taxiLightPos')}
                    clickAreas={2}
                    topText="TAXI"
                    onPress={(i) => emitActionInfo(`taxiLightPosChange${i}`)}
                    lastChild
                />
            </Section>

            <Section lastChild>
                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('logoLightPos')}
                    clickAreas={2}
                    topText={'LOGO\nOFF'}
                    bottomText="ON"
                    onPress={(i) => emitActionInfo(`logoLightPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('strobeLightPos')}
                    clickAreas={3}
                    topText={'POSITION\nSTROBE\nSTEADY'}
                    bottomText="STEADY"
                    rightText="OFF"
                    onPress={(i) => emitActionInfo(`strobePositionLightsPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('beaconLightPos')}
                    clickAreas={2}
                    topText={'ANTI\nCOLLISION\nOFF'}
                    bottomText="ON"
                    onPress={(i) => emitActionInfo(`beaconLightPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('wingLightPos')}
                    clickAreas={2}
                    topText={'WING\nOFF'}
                    bottomText="ON"
                    onPress={(i) => emitActionInfo(`wingLightPosChange${i}`)}
                />

                <WrappedSwitch
                    scale={scale}
                    position={getSimValue('wheelLightPos')}
                    clickAreas={2}
                    topText={'WHEEL\nWELL\nOFF'}
                    bottomText="ON"
                    onPress={(i) => emitActionInfo(`wheelLightPosChange${i}`)}
                    lastChild
                />
            </Section>
        </Container>
    );
}

Boeing = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({ commonStore })
)(Boeing);

export default Boeing;
