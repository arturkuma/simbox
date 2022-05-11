import styled from 'styled-components/native';
import { ScrollView } from 'react-native';
import { findLastKey, get, map } from 'lodash';
import { connect } from 'react-redux';
import Text from '../components/Text';
import ProfileTile from '../components/ProfileTile';
import { CONFIG_REDUCER } from '../store';
import { socket } from '../services/socket';

const Container = styled.View`
    flex: 1;
`;

const ScrollContainer = styled.View`
    padding: 50px;
    align-items: center;
`;

const HeaderText = styled(Text)`
    font-size: 30px;
    padding-bottom: 50px;
`;

const NoConfigsText = styled(Text)`
    font-size: 20px;
`;

const ProfileTileContainer = styled(ProfileTile)`
    margin-bottom: ${props => (get(props, 'lastChild') ? 0 : '20px')};
`;

const ListContainer = styled.View`
    width: 100%;
`;

function NoAircraftConfig({ aircraftConfigs, currentSimulator }) {
    const filteredAircraftConfigs = {};

    map(aircraftConfigs, (config, key) => {
        if (get(config, 'simulator') === currentSimulator) {
            filteredAircraftConfigs[key] = config;
        }
    });

    return (
        <Container>
            <ScrollView>
                <ScrollContainer>
                    <HeaderText>SELECT AIRCRAFT PROFILE</HeaderText>

                    {Object.keys(filteredAircraftConfigs).length === 0 && (
                        <NoConfigsText>No aircraft configs for current simulator</NoConfigsText>
                    )}

                    <ListContainer>
                        {map(filteredAircraftConfigs, (config, id) => (
                            <ProfileTileContainer
                                onPress={() => {
                                    socket.emit('setCommonStoreProperty', { key: 'aircraftConfig', value: id });
                                }}
                                name={`${get(config, 'name', 'Unknown name')}`}
                                simulator={get(config, 'simulator')}
                                author={get(config, 'author', 'Unknown author')}
                                lastChild={findLastKey(filteredAircraftConfigs) === id}
                            />
                        ))}
                    </ListContainer>
                </ScrollContainer>
            </ScrollView>
        </Container>
    );
}

NoAircraftConfig = connect(
    ({ [CONFIG_REDUCER]: { aircraftConfigs, commonStore } }) => ({
        aircraftConfigs,
        currentSimulator: get(commonStore, 'xPlane11') ? 'XPLANE11' : get(commonStore, 'MSFS2020') ? 'MSFS2020' : ''
    }),
    { }
)(NoAircraftConfig);

export default NoAircraftConfig;
