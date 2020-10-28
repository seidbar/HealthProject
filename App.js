import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './src/Components/Navigation';
import HealthData from './src/Context/HealthData';
import HealthKitPermissions from './src/Context/HealthKitPermissions';

export default () => (
  <HealthKitPermissions>
    <HealthData>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AppNavigator />
      </ApplicationProvider>
    </HealthData>
  </HealthKitPermissions>
);
