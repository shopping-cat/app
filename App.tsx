import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native';
import { ApolloProvider } from '@apollo/client';
// import { enableFlipperApolloDevtools } from 'react-native-flipper-apollo-devtools'
import codePush from "react-native-code-push";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import remoteConfig from '@react-native-firebase/remote-config';
import { client } from './src/lib/apollo';
import Navigation from './src/screens';



//@ts-ignore
// __DEV__ && enableFlipperApolloDevtools(client)





const App = () => {


  useEffect(() => {
    // remote config init
    remoteConfig()
      .setDefaults({
        app_version: `{"version":"0.0.0","require":false}`,
      })
      .then(() => remoteConfig().fetchAndActivate())
  }, [])

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

// export default App
// export default codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.ON_NEXT_RESTART })(App)
export default __DEV__ ? App : codePush({ checkFrequency: codePush.CheckFrequency.ON_APP_RESUME, installMode: codePush.InstallMode.IMMEDIATE })(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})