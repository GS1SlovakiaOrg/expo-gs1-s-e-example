import Colors from "@/styles/Colors";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (    
  <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.gs1OrangeColorRgb,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center'        
      }}>
      <Stack.Screen name="index" options={{title:'Example App'}} />
    </Stack>
  );
}
