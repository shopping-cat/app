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
// export default codePush(App)
export default __DEV__ ? App : codePush(App)

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})