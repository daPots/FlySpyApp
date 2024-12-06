import { Stack } from "expo-router";
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { GuestProvider } from "./guestContext";

export default function RootLayout() {
  return (
    <I18nextProvider i18n={i18n}>
      <GuestProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="welcome" options={{ headerShown: false }} />
          <Stack.Screen name="form" options={{ headerShown: false }} />
          <Stack.Screen name="home" options = {{headerShown: false}} />
          <Stack.Screen name="completed" options = {{headerShown: false}} />
        </Stack>
      </GuestProvider>
    </I18nextProvider>
  );
}