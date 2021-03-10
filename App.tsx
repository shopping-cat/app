import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'
import codePush from "react-native-code-push";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import { client } from './src/lib/apollo';
import Navigation from './src/screens';

//@ts-ignore
__DEV__ && enableFlipperApolloDevtools(client)


// remote config init
remoteConfig()
  .setDefaults({
    app_version: 'loading',
  })
  .then(() => remoteConfig().fetchAndActivate())
  .then(fetchedRemotely => {
    if (fetchedRemotely) {
      console.log('Configs were retrieved from the backend and activated.')
    } else {
      console.log(
        'No configs were fetched from the backend, and the local configs were already activated',
      )
    }
  })


const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <SafeAreaProvider>
          <StatusBar backgroundColor='#fff' barStyle='dark-content' />
          <View style={styles.container} >
            <Navigation />
          </View>
        </SafeAreaProvider>
      </ApolloProvider>
    </>
  )
}

export default App
// export default __DEV__ ? App : codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESTART })(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})