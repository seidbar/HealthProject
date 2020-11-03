import React from 'react';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {AppNavigator} from './src/Components/Navigation';
import HealthData from './src/Context/HealthData';
import HealthKitPermissions from './src/Context/HealthKitPermissions';
import HealthHistory from './src/Context/HealthHistory';
import AppStatus from './src/Context/AppStatus';

export default () => (
  <AppStatus>
    <HealthKitPermissions>
      <HealthData>
        <HealthHistory>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider {...eva} theme={eva.light}>
            <AppNavigator />
          </ApplicationProvider>
        </HealthHistory>
      </HealthData>
    </HealthKitPermissions>
  </AppStatus>
);
